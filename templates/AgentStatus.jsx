import { useState, useEffect } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const AGENTS = [
  { name: "alice", role: "Gateway", status: "active", mem: "2.4TB", uptime: "347d", load: 34 },
  { name: "lucidia", role: "Core AI", status: "active", mem: "1.8TB", uptime: "289d", load: 61 },
  { name: "cecilia", role: "Memory", status: "active", mem: "1.2TB", uptime: "289d", load: 28 },
  { name: "cece", role: "Governance", status: "active", mem: "940GB", uptime: "245d", load: 12 },
  { name: "meridian", role: "Architecture", status: "active", mem: "620GB", uptime: "194d", load: 45 },
  { name: "eve", role: "Monitoring", status: "active", mem: "380GB", uptime: "156d", load: 72 },
  { name: "cadence", role: "Music", status: "idle", mem: "290GB", uptime: "112d", load: 3 },
  { name: "radius", role: "Physics", status: "idle", mem: "210GB", uptime: "98d", load: 0 },
];

const SERVICES = [
  { name: "api.blackroad.io", status: "operational", latency: "12ms", uptime: "99.99%" },
  { name: "app.blackroad.io", status: "operational", latency: "34ms", uptime: "99.97%" },
  { name: "ws.blackroad.io", status: "operational", latency: "8ms", uptime: "99.98%" },
  { name: "mesh.blackroad.network", status: "operational", latency: "22ms", uptime: "99.95%" },
  { name: "ledger.blackroad.systems", status: "operational", latency: "18ms", uptime: "99.99%" },
  { name: "vectors.blackroad.systems", status: "degraded", latency: "89ms", uptime: "99.84%" },
];

const EVENTS = [
  { time: "2m ago", agent: "cecilia", action: "Memory commit #4821 — 3 entries written to PS-SHA∞ chain" },
  { time: "8m ago", agent: "cece", action: "Policy deployed: edu.review.teacher-only scope updated" },
  { time: "15m ago", agent: "eve", action: "Latency spike on mesh.na1 — auto-scaled, resolved in 2m" },
  { time: "34m ago", agent: "system", action: "DNS propagation complete for edu.blackroad.io" },
  { time: "1h ago", agent: "cadence", action: "Composition #42 exported — 3:42, C minor, 108 BPM" },
  { time: "2h ago", agent: "alice", action: "Gateway health check passed — 7 endpoints, 2.4k concurrent WS" },
  { time: "3h ago", agent: "cece", action: "Weekly governance: 12,400 evals, 0 bypasses, ledger verified" },
];

function GradientBar({ height = 1 }) {
  return <div style={{ height, background: GRADIENT, borderRadius: 2 }} />;
}

function LoadBar({ value, color }) {
  return (
    <div
      style={{
        height: 3,
        background: "#1a1a1a",
        borderRadius: 2,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: color || GRADIENT,
          borderRadius: 2,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}

function StatusDot({ status }) {
  const colors = {
    active: "#22c55e",
    idle: "#525252",
    degraded: "#FF2255",
    operational: "#22c55e",
  };
  return (
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: colors[status] || "#525252",
        flexShrink: 0,
      }}
    />
  );
}

export default function AgentStatus() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const activeCount = AGENTS.filter((a) => a.status === "active").length;
  const degradedServices = SERVICES.filter((s) => s.status === "degraded").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "48px 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <GradientBar height={2} />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            margin: "32px 0 40px",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#525252",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 8,
              }}
            >
              System Status
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#f5f5f5",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              BlackRoad OS — Live
            </h1>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                textAlign: "right",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#22c55e",
              }}
            >
              {activeCount}/{AGENTS.length} agents active
            </div>
            {degradedServices > 0 && (
              <div
                style={{
                  textAlign: "right",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#FF2255",
                }}
              >
                {degradedServices} degraded
              </div>
            )}
          </div>
        </div>

        {/* Agents Grid */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#404040",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            Agents
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 8,
            }}
          >
            {AGENTS.map((agent, i) => (
              <div
                key={agent.name}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 10,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <StatusDot status={agent.status} />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: "#d4d4d4",
                      }}
                    >
                      {agent.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "#404040",
                      textTransform: "uppercase",
                    }}
                  >
                    {agent.role}
                  </span>
                </div>
                <LoadBar value={agent.load} color={COLORS[i % COLORS.length]} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#404040",
                  }}
                >
                  <span>{agent.mem}</span>
                  <span>{agent.uptime}</span>
                  <span>{agent.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#404040",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            Services
          </div>
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {SERVICES.map((svc, i) => (
              <div
                key={svc.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderBottom: i < SERVICES.length - 1 ? "1px solid #141414" : "none",
                }}
              >
                <StatusDot status={svc.status} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "#d4d4d4",
                    flexGrow: 1,
                  }}
                >
                  {svc.name}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: svc.status === "operational" ? "#525252" : "#FF2255",
                    textTransform: "uppercase",
                  }}
                >
                  {svc.status}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#404040",
                    minWidth: 48,
                    textAlign: "right",
                  }}
                >
                  {svc.latency}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#404040",
                    minWidth: 56,
                    textAlign: "right",
                  }}
                >
                  {svc.uptime}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#404040",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            Recent Events
          </div>
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {EVENTS.map((evt, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "10px 16px",
                  borderBottom: i < EVENTS.length - 1 ? "1px solid #141414" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#404040",
                    minWidth: 56,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {evt.time}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#525252",
                    minWidth: 64,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {evt.agent}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#737373",
                    lineHeight: 1.5,
                  }}
                >
                  {evt.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        <GradientBar height={1} />
      </div>
    </div>
  );
}
