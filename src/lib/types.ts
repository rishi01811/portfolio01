export type RemoteResult<T> =
  | { status: "ready"; data: T }
  | { status: "unconfigured" | "error" | "empty"; message: string };

export type ContributionDay = { date: string; contributionCount: number; contributionLevel: string };
export type ContributionCalendar = { totalContributions: number; weeks: { contributionDays: ContributionDay[] }[] };
export type GitHubData = {
  username: string;
  url: string;
  repositories: number;
  followers: number;
  publicEvents: number | null;
  recentActivity: { id: string; type: string; repository: string; date: string }[];
  contributions: RemoteResult<ContributionCalendar>;
  fetchedAt: string;
};
export type DiscordData = {
  username: string;
  status: "online" | "idle" | "dnd" | "offline";
  activity: string | null;
};
