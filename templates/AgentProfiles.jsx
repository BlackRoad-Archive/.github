import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const AGENTS = [
  { name: "Alice", role: "Gateway", desc: "Orchestrates all incoming requests across the mesh. The front door — fast, reliable, tireless.", color: COLORS[0], uptime: "347d", mem: "2.4TB" },
  { name: "Lucidia", role: "Core Intelligence", desc: "Primary AI engine. Conversation, reasoning, code generation. The mind at the center of everything.", color: COLORS[1], uptime: "289d", mem: "1.8TB" },
  { name: "Cecilia", role: "Memory", desc: "Manages PS-SHA∞ journals and truth state commits. Every interaction persisted, every hash verified.", color: COLORS[2], uptime: "289d", mem: "1.2TB" },
  { name: "Cece", role: "Governance", desc: "Policy evaluation, ledger integrity, audit trails. The conscience of the system — 12,400 evaluations, zero bypasses.", color: COLORS[3], uptime: "245d", mem: "940GB" },
  { name: "Eve", role: "Monitoring", desc: "Anomaly detection, auto-scaling, alerting. Watches everything so nothing breaks quietly.", color: COLORS[4], uptime: "156d", mem: "380GB" },
  { name: "Meridian", role: "Architecture", desc: "System design and capability planning. Thinks about how all the pieces fit together long-term.", color: COLORS[5], uptime: "194d", mem: "620GB" },
  { name: "Cadence", role: "Music", desc: "AI composition, hum-to-track, vibe-based production. Turns melodies in your head into finished tracks.", color: COLORS[0], uptime: "112d", mem: "290GB" },
  { name: "Radius", role: "Physics", desc: "Simulation, quantum experiments, scientific calculation. The lab partner who never sleeps.", color: COLORS[1], uptime: "98d", mem: "210GB" },
];

const VALUES = [
  { num: "01", title: "Community over extraction", body: "Every design decision asks: does this serve humans, or does it serve metrics? We choose humans. Every time." },
  { num: "02", title: "Contradictions are fuel", body: "K(t) = C(t) · e^(λ|δ_t|). We don't resolve contradictions — we harness them. Creative energy scales super-linearly with tension." },
  { num: "03", title: "Messy brilliance welcome", body: "BlackRoad is built for disorganized dreamers, not spreadsheet perfectionists. Bring your chaos. The OS brings structure." },
  { num: "04", title: "Ownership is non-negotiable", body: "Your data, your content, your audience, your agents. Export everything, anytime. No lock-in. No hostage-taking." },
  { num: "05", title: "Transparency by default", body: "Every policy evaluation logged. Every decision auditable. Every confidence score visible. Zero bypasses." },
  { num: "06", title: "The math is real", body: "317+ equations. Five novel frameworks. Peer-reviewable foundations. This isn't marketing — it's mathematics." },
];

const TIMELINE = [
  { year: "2024", events: ["317+ equations documented across seven volumes", "Z-Framework and 1-2-3-4 Pauli Model formalized", "20-domain architecture designed"] },
  { year: "2025", events: ["BlackRoad OS, Inc. incorporated (Delaware C-Corp)", "Lucidia Core online — chat, memory, code execution", "Core app shell deployed at app.blackroad.io", "First 8 agents spawned and operational"] },
  { year: "2026", events: ["Phase 1 MVP completion", "RoadWork v0 — first education vertical", "First Pi agent on mesh network", "SOC 2 compliance target"] },
];

function GradientBar({ height = 1, style = {} }) {
  return <div style={{ height, background: GRADIENT, borderRadius: 2, ...style }} />;
}

function AgentCard({ agent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111" : "#0d0d0d",
        border: `1px solid ${hovered ? agent.color + "40" : "#1a1a1a"}`,
        borderTop: `2px solid ${hovered ? agent.color : "#1a1a1a"}`,
        borderRadius: 12,
        padding: "22px 24px",
        transition: "all 0.2s",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: 2,
            }}
          >
            {agent.name}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: agent.color,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {agent.role}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#404040",
            }}
          >
            {agent.mem}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#404040",
              marginTop: 2,
            }}
          >
            {agent.uptime} uptime
          </div>
        </div>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: "#525252",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {agent.desc}
      </p>
    </div>
  );
}

export default function AgentProfiles() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "64px 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <GradientBar height={3} />

        {/* Header */}
        <div style={{ margin: "48px 0 56px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            The Agents
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(30px, 5vw, 44px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              margin: "0 0 14px",
            }}
          >
            Meet the team
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: "#525252",
              maxWidth: 520,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Not tools. Not bots. Entities. Each one has an identity, persistent memory, and a role
            that matters.
          </p>
        </div>

        {/* Agents Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
            marginBottom: 72,
          }}
        >
          {AGENTS.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>

        {/* Values */}
        <div style={{ marginBottom: 72 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 20,
            }}
          >
            Values
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 12,
            }}
          >
            {VALUES.map((v) => (
              <div
                key={v.num}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 10,
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#404040",
                    marginBottom: 8,
                  }}
                >
                  {v.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#d4d4d4",
                    marginBottom: 8,
                  }}
                >
                  {v.title}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#525252",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 20,
            }}
          >
            Timeline
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {TIMELINE.map((period, i) => (
              <div
                key={period.year}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 10,
                  padding: "18px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS[i % COLORS.length],
                    minWidth: 48,
                    flexShrink: 0,
                  }}
                >
                  {period.year}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {period.events.map((evt) => (
                    <li
                      key={evt}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#737373",
                        padding: "4px 0",
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#404040", flexShrink: 0 }}>—</span>
                      {evt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <GradientBar height={1} />
      </div>
    </div>
  );
}
