import { NextResponse } from "next/server";
import type { DiscordData, RemoteResult } from "@/lib/types";

export const dynamic = "force-dynamic";
export async function GET() {
  const userId = process.env.DISCORD_USER_ID?.trim();
  if (!userId) return NextResponse.json({ status: "unconfigured", message: "Presence isn’t shared yet." } satisfies RemoteResult<DiscordData>);
  if (!/^\d{17,20}$/.test(userId)) return NextResponse.json({ status: "error", message: "Discord presence isn’t available right now." }, { status: 503 });
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Presence unavailable");
    const result = await response.json();
    if (!result.success || !result.data) return NextResponse.json({ status: "empty", message: "Presence isn’t shared yet." } satisfies RemoteResult<DiscordData>);
    const { discord_user: user, discord_status: status, activities } = result.data;
    if (!["online", "idle", "dnd", "offline"].includes(status) || !user?.username) throw new Error("Invalid presence response");
    return NextResponse.json({ status: "ready", data: { username: user.global_name || user.username, status, activity: activities?.find((activity: { type: number; name: string }) => activity.type === 0)?.name || null } } satisfies RemoteResult<DiscordData>);
  } catch {
    return NextResponse.json({ status: "error", message: "Presence is temporarily unavailable." } satisfies RemoteResult<DiscordData>, { status: 502 });
  }
}
