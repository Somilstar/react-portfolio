const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 15;
const MAX_TRACKED_CLIENTS = 5000;

const hits = new Map<string, number[]>();

/**
 * Best-effort, per-instance limit. Serverless instances don't share memory, so
 * this slows casual abuse. The free-tier limits on the provider accounts are the hard cap.
 */
export function isRateLimited(client: string, now = Date.now()): boolean {
  const recent = (hits.get(client) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(client, recent);
    return true;
  }
  if (hits.size >= MAX_TRACKED_CLIENTS) hits.clear();
  recent.push(now);
  hits.set(client, recent);
  return false;
}
