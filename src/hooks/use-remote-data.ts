"use client";

import { useCallback, useEffect, useState } from "react";
import type { RemoteResult } from "@/lib/types";

export function useRemoteData<T>(url: string, refreshInterval?: number) {
  const [result, setResult] = useState<RemoteResult<T> | null>(null);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => { setResult(null); setAttempt(value => value + 1); }, []);
  useEffect(() => {
    let active = true;
    let controller: AbortController | undefined;
    async function load() {
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch(url, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) });
        const data: RemoteResult<T> = await response.json();
        if (!data || !["ready", "unconfigured", "error", "empty"].includes(data.status)) throw new Error("Invalid response");
        if (active) setResult(data);
      } catch (error) {
        if (active && !(error instanceof DOMException && error.name === "AbortError")) setResult({ status: "error", message: "The connection couldn’t be completed. Please try again." });
      }
    }
    void load();
    const timer = refreshInterval ? setInterval(() => { if (document.visibilityState === "visible") void load(); }, refreshInterval) : undefined;
    return () => { active = false; controller?.abort(); if (timer) clearInterval(timer); };
  }, [url, attempt, refreshInterval]);
  return { result, retry };
}
