import type { EvidenceImpactProjection } from "./types";

const apiBase = (import.meta.env.PUBLIC_TAMVER_LEDGER_API_BASE || "").replace(/\/$/, "");

/** Future v13 contract. Returns null until the backend implements forward lineage. */
export async function fetchV13EvidenceImpact(evidenceId: string): Promise<EvidenceImpactProjection | null> {
  if (!apiBase) return null;
  try {
    const response = await fetch(`${apiBase}/api/tamver/evidence/impact?evidenceId=${encodeURIComponent(evidenceId)}`);
    if (!response.ok) return null;
    const data = await response.json();
    return { ...data, basis: "V13_API" } as EvidenceImpactProjection;
  } catch {
    return null;
  }
}
