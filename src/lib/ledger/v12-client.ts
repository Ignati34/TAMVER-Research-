import type { EvidenceItem, LedgerTrace } from "./v12-types";
import { sanitizeEvidence, sanitizeTrace } from "./publication-gateway";
import { v12EvidenceFixture, v12TraceFixture } from "./v12-fixture";

const apiBase = (import.meta.env.PUBLIC_TAMVER_LEDGER_API_BASE || "").replace(/\/$/, "");

async function getJson<T>(path: string): Promise<T> {
  if (!apiBase) throw new Error("PUBLIC_TAMVER_LEDGER_API_BASE is not configured");
  const response = await fetch(`${apiBase}${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Ledger API ${response.status}: ${response.statusText}`);
  return response.json() as Promise<T>;
}

export async function listPublicEvidence(): Promise<EvidenceItem[]> {
  try {
    const payload = await getJson<{ items: EvidenceItem[] }>("/api/tamver/evidence/items");
    return payload.items.map(sanitizeEvidence).filter((x): x is EvidenceItem => Boolean(x));
  } catch {
    return v12EvidenceFixture.map(sanitizeEvidence).filter((x): x is EvidenceItem => Boolean(x));
  }
}

export async function getPublicClaimTrace(claimId = "claim-scm"): Promise<LedgerTrace> {
  try {
    const trace = await getJson<LedgerTrace>(`/api/tamver/evidence/trace?claimId=${encodeURIComponent(claimId)}`);
    return sanitizeTrace(trace);
  } catch {
    if (claimId !== "claim-scm") throw new Error("Claim is unavailable in static demo mode");
    return sanitizeTrace(v12TraceFixture);
  }
}

export const ledgerApiBase = apiBase;
