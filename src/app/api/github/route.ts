import { NextResponse } from "next/server";
import type { ContributionCalendar, GitHubData, RemoteResult } from "@/lib/types";

export const dynamic = "force-dynamic";
type GitHubEvent = { id: string; type: string; repo: { name: string }; created_at: string };

async function githubFetch(path: string, token?: string) {
  return fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    next: { revalidate: 900 }, signal: AbortSignal.timeout(10000),
  });
}

async function getContributions(username: string, token?: string): Promise<RemoteResult<ContributionCalendar>> {
  if (!token) return { status: "unconfigured", message: "Contribution history isn’t connected yet." };
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: "query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }", variables: { login: username } }),
      next: { revalidate: 900 }, signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("GitHub unavailable");
    const result = await response.json();
    const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;
    if (result.errors || !calendar || !Array.isArray(calendar.weeks) || typeof calendar.totalContributions !== "number") throw new Error("Invalid contribution response");
    return { status: "ready", data: calendar };
  } catch { return { status: "error", message: "Contribution history is temporarily unavailable." }; }
}

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();
  if (!username) return NextResponse.json({ status: "unconfigured", message: "My GitHub feed is getting connected. Explore the selected projects in the meantime." } satisfies RemoteResult<GitHubData>);
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username)) return NextResponse.json({ status: "error", message: "The GitHub profile configuration needs a quick update." }, { status: 503 });
  const token = process.env.GITHUB_TOKEN;
  try {
    const [userResponse, eventResult, contributions] = await Promise.all([
      githubFetch(`/users/${encodeURIComponent(username)}`, token),
      githubFetch(`/users/${encodeURIComponent(username)}/events/public?per_page=30`, token).then(async response => response.ok ? await response.json() as GitHubEvent[] : null).catch(() => null),
      getContributions(username, token),
    ]);
    if (userResponse.status === 404) return NextResponse.json({ status: "empty", message: "This GitHub profile isn’t available yet." } satisfies RemoteResult<GitHubData>);
    if (!userResponse.ok) throw new Error("GitHub request failed");
    const user = await userResponse.json();
    if (typeof user.public_repos !== "number" || typeof user.followers !== "number") throw new Error("Invalid profile response");
    const events = Array.isArray(eventResult) ? eventResult.filter(event => event.id && event.type && event.repo?.name && event.created_at) : null;
    return NextResponse.json({ status: "ready", data: {
      username, url: `https://github.com/${encodeURIComponent(username)}`, repositories: user.public_repos, followers: user.followers,
      publicEvents: events?.length ?? null,
      recentActivity: events?.slice(0, 4).map(event => ({ id: event.id, type: event.type.replace(/Event$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"), repository: event.repo.name, date: event.created_at })) ?? [],
      contributions, fetchedAt: new Date().toISOString(),
    } } satisfies RemoteResult<GitHubData>, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" } });
  } catch {
    return NextResponse.json({ status: "error", message: "GitHub is taking a breather. Please try again in a moment." } satisfies RemoteResult<GitHubData>, { status: 502 });
  }
}
