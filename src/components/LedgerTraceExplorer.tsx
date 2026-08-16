import React, { useEffect, useMemo, useState } from "react";
import type { LedgerTrace, LedgerTraceNode, TraceKind } from "../lib/ledger/v12-types";
import { v12TraceFixture } from "../lib/ledger/v12-fixture";
import { sanitizeTrace } from "../lib/ledger/publication-gateway";

const kindOrder: TraceKind[] = ["REPORT_CLAIM","METRIC","FORMULA","SCENARIO_NODE","EVIDENCE_ITEM","SOURCE"];
const apiBase = (import.meta.env.PUBLIC_TAMVER_LEDGER_API_BASE || "").replace(/\/$/, "");

function confidence(node: LedgerTraceNode) {
  const value = node.details?.confidence;
  return typeof value === "number" ? value : 1;
}

export default function LedgerTraceExplorer({ claimId = "claim-scm" }: { claimId?: string }) {
  const [trace, setTrace] = useState<LedgerTrace>(() => sanitizeTrace(v12TraceFixture));
  const [selected, setSelected] = useState<LedgerTraceNode | null>(null);
  const [mode, setMode] = useState(apiBase ? "connecting" : "demo");

  useEffect(() => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/tamver/evidence/trace?claimId=${encodeURIComponent(claimId)}`)
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(data => { const safe = sanitizeTrace(data); setTrace(safe); setMode("live"); })
      .catch(() => setMode("demo"));
  }, [claimId]);

  const groups = useMemo(() => kindOrder.map(kind => [kind, trace.nodes.filter(n => n.kind === kind)] as const), [trace]);

  return (
    <div className="ledger-shell">
      <div className="ledger-toolbar">
        <span>V12 PROVENANCE CHAIN</span>
        <span className={`ledger-mode ${mode}`}>{mode === "live" ? "LIVE LEDGER" : mode === "connecting" ? "CONNECTING" : "STATIC DEMO"}</span>
      </div>
      <div className="ledger-chain">
        {groups.map(([kind, nodes], i) => nodes.length ? (
          <React.Fragment key={kind}>
            <section className="ledger-column">
              <div className="ledger-kind">{kind.replaceAll("_", " ")}</div>
              {nodes.map(node => (
                <button
                  key={node.id}
                  className={`ledger-node ${selected?.id === node.id ? "active" : ""}`}
                  style={{ opacity: Math.max(.55, confidence(node)) }}
                  onClick={() => setSelected(node)}
                >
                  <span className="ledger-dot" />
                  <strong>{node.label}</strong>
                  <small>{node.id}</small>
                </button>
              ))}
            </section>
            {i < groups.length - 1 && <div className="ledger-arrow">→</div>}
          </React.Fragment>
        ) : null)}
      </div>
      <div className="ledger-details">
        <div>
          <span className="ledger-kind">SELECTED NODE</span>
          <h3>{selected?.label || "Select any provenance node"}</h3>
        </div>
        <pre>{selected ? JSON.stringify(selected.details ?? {}, null, 2) : "Metadata is shown here without exposing private source URIs."}</pre>
      </div>
    </div>
  );
}
