"use client";

import { Activity, ArrowUpRight, Code2, GitCommitHorizontal, Github, GitFork, MessageCircle, RefreshCw, Users } from "lucide-react";
import { useRemoteData } from "@/hooks/use-remote-data";
import type { ContributionCalendar, DiscordData, GitHubData, RemoteResult } from "@/lib/types";
import { ExternalLink, Reveal, SectionHeading } from "./ui";

export function ContributionGrid({ result }: { result: RemoteResult<ContributionCalendar> }) {
  if (result.status !== "ready") return <div className="contribution-empty"><div className="empty-grid" aria-hidden="true">{Array.from({ length: 196 }, (_, index) => <i key={index} />)}</div><div className="empty-grid-label"><GitCommitHorizontal size={22} /><strong>{result.status === "error" ? "A moment between commits." : "Good things take a few commits."}</strong><span>{result.message}</span></div></div>;
  const { totalContributions, weeks } = result.data;
  if (!weeks.length) return <div className="plain-empty">No contribution history was returned by GitHub.</div>;
  const levels: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  return <><div className="contribution-summary"><strong>{totalContributions.toLocaleString()} contributions</strong><span>in the last year</span></div><div className="contribution-scroll" tabIndex={0} role="region" aria-label="GitHub contribution calendar; scroll horizontally to explore dates"><div className="contribution-grid">{weeks.map((week, index) => <div className="contribution-week" key={index}>{week.contributionDays.map(day => <span key={day.date} className={`contribution-day level-${levels[day.contributionLevel] ?? 0}`} title={`${day.date}: ${day.contributionCount} contributions`} aria-label={`${day.date}: ${day.contributionCount} contributions`} />)}</div>)}</div></div>{totalContributions === 0 && <p className="small muted">No contributions recorded for this period yet.</p>}<div className="contribution-legend"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} className={`contribution-day level-${level}`} />)}<span>More</span></div></>;
}

export function DiscordStatus() {
  const { result, retry } = useRemoteData<DiscordData>("/api/discord", 60000);
  const data = result?.status === "ready" ? result.data : null;
  const labels = { online: "Online", idle: "Taking a break", dnd: "Do not disturb", offline: "Offline" };
  return <div className="discord-card"><div className="discord-avatar"><MessageCircle size={26} /><span className={`presence-dot ${data?.status || "unknown"}`} /></div><div><span className="eyebrow">SOMEWHERE ON THE INTERNET</span><strong>{data ? data.username : "Rishi on Discord"}</strong><p aria-live="polite">{!result ? "Checking presence…" : data ? `${labels[data.status]}${data.activity ? ` · ${data.activity}` : ""}` : result.status !== "ready" ? result.message : ""}</p></div>{result?.status === "error" && <button className="icon-button" onClick={retry} aria-label="Retry Discord presence"><RefreshCw size={17} /></button>}<span className="discord-caption">{data ? "VIA LANYARD" : "NOT CONNECTED"}</span></div>;
}

export function ActivitySection() {
  const { result, retry } = useRemoteData<GitHubData>("/api/github");
  const data = result?.status === "ready" ? result.data : null;
  const metrics = [
    { label: "Public repositories", value: data?.repositories, icon: GitFork, caption: "Ideas, in repositories" },
    { label: "Yearly contributions", value: data?.contributions.status === "ready" ? data.contributions.data.totalContributions : null, icon: GitCommitHorizontal, caption: "Every little commit counts" },
    { label: "Recent public events", value: data?.publicEvents, icon: Code2, caption: "Latest API window · up to 30" },
    { label: "GitHub followers", value: data?.followers, icon: Users, caption: "Building in good company" },
  ];
  return <section id="activity" className="section activity-section"><div className="container"><SectionHeading title="Behind the commits" anchor="activity" /><p className="section-description">Small steps. Regular experiments. A little better every day.</p>
    <Reveal className="github-panel"><div className="panel-heading"><div><Github size={21} /><h3>My GitHub activity</h3></div>{data ? <ExternalLink className="text-link" href={data.url}>@{data.username}</ExternalLink> : <span className="connection-status"><span />{!result ? "CONNECTING" : result.status === "error" ? "TEMPORARILY UNAVAILABLE" : "NOT CONNECTED YET"}</span>}</div>
      {!result ? <div className="activity-skeleton" role="status" aria-label="Loading GitHub activity"><div /><div /><span>Fetching the latest from GitHub…</span></div> : <ContributionGrid result={data?.contributions || { status: result.status === "error" ? "error" : "unconfigured", message: result.status !== "ready" ? result.message : "Contribution history isn’t connected yet." }} />}
      <div className="panel-bottom"><span><span className={`status-dot ${data ? "" : "neutral"}`} />{data ? "Sourced from GitHub · refreshed every 15 minutes" : "Activity will appear when GitHub is connected."}</span>{(result?.status === "error" || data?.contributions.status === "error") && <button className="text-link" onClick={retry}><RefreshCw size={14} />Try again</button>}{!data && result?.status !== "error" && <a className="text-link" href="#projects">Explore my work<ArrowUpRight size={14} /></a>}</div>
    </Reveal>
    <div className="dashboard-label"><span className="eyebrow"><Activity size={13} />DEVELOPER SNAPSHOT</span><span className="mono">{data ? "FROM THE SOURCE" : "WAITING FOR THE FIRST SYNC"}</span></div>
    <div className="metrics-grid">{metrics.map(({ label, value, icon: Icon, caption }, index) => <Reveal key={label} delay={index * 0.05} className="metric-card"><div><Icon size={18} /><span>{label}</span></div><strong aria-label={value == null ? "Not available" : undefined}>{value == null ? "—" : value.toLocaleString()}</strong><p>{!result ? "Loading…" : value == null ? "Available when connected" : caption}</p></Reveal>)}</div>
    {data && <Reveal className="recent-activity"><h3>From the latest public activity</h3>{data.recentActivity.length ? <ul>{data.recentActivity.map(event => <li key={event.id}><GitCommitHorizontal size={16} /><span>{event.type}<ExternalLink href={`https://github.com/${event.repository}`}>{event.repository}</ExternalLink></span><time dateTime={event.date}>{new Date(event.date).toLocaleDateString("en-GB", { month: "short", day: "numeric", timeZone: "UTC" })}</time></li>)}</ul> : <p className="muted">{data.publicEvents === null ? "Recent public activity is temporarily unavailable." : "No recent public events to show."}</p>}</Reveal>}
    
  </div></section>;
}
