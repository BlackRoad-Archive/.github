import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const PORTALS = [
  { name: "RoadWork", desc: "AI tutoring that adapts to how you actually learn. Not how a textbook thinks you should.", tag: "Education" },
  { name: "RoadView", desc: "Search that verifies before it surfaces. Every result scored for confidence, not clicks.", tag: "Search" },
  { name: "RoadGlitch", desc: "Drag-and-drop automation that generates production code. Your codebase, your style.", tag: "Backend" },
  { name: "RoadWorld", desc: "Virtual environments with real-world bridges. 80% creator revenue. You own everything.", tag: "Worlds" },
  { name: "BackRoad", desc: "Social without the sickness. No vanity metrics. No addiction mechanics. Just people.", tag: "Social" },
  { name: "CashRoad", desc: "Financial clarity without judgment. Decision-time assistance, not post-spending shame.", tag: "Finance" },
];

const PRINCIPLES = [
  { number: "01", title: "Truth-First", body: "Every piece of information carries a confidence score. No SEO gaming. No ad-driven rankings. Only verified facts surface." },
  { number: "02", title: "Creator-Owned", body: "80% revenue share. Your data, your content, your audience. Portable identity across every portal in the ecosystem." },
  { number: "03", title: "Agent Intelligence", body: "1,000 AI agents with persistent memory, individual identities, and evolving capabilities oriented toward community betterment." },
  { number: "04", title: "Zero Admin", body: "The OS handles forms, PDFs, onboarding, and compliance in the background. Admin becomes invisible, not a life event." },
];

const STATS = [
  { value: "1,000", label: "AI Agents" },
  { value: "20", label: "Domains" },
  { value: "150+", label: "Subdomains" },
  { value: "80%", label: "Creator Revenue" },
];

function GradientBar({ height = 2, style = {} }) {
  return <div style={{ height, background: GRADIENT, borderRadius: 2, ...style }} />;
}

function PortalCard({ name, desc, tag, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111" : "#0d0d0d",
        border: `1px solid ${hovered ? color : "#1a1a1a"}`,
        borderRadius: 12,
        padding: "20px 22px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#f5f5f5",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: color,
            background: `${color}15`,
            padding: "3px 8px",
            borderRadius: 4,
            border: `1px solid ${color}30`,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {tag}
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
        {desc}
      </p>
    </div>
  );
}

export default function Portals() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "64px 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <GradientBar height={3} />

        {/* Hero */}
        <div style={{ textAlign: "center", margin: "64px 0 80px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 16,
            }}
          >
            BlackRoad OS
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 20px",
            }}
          >
            An OS that works
            <br />
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              for you
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#525252",
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            20 portals. 1,000 agents. One OS that eliminates admin, amplifies creativity, and returns 80% of everything to creators.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              flexWrap: "wrap",
              marginTop: 48,
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    background: GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#525252",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portals Grid */}
        <div style={{ marginBottom: 80 }}>
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
            Portals
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            {PORTALS.map((p, i) => (
              <PortalCard key={p.name} {...p} color={COLORS[i % COLORS.length]} />
            ))}
          </div>
        </div>

        {/* Principles */}
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
            Principles
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 12 }}>
            {PRINCIPLES.map((p) => (
              <div
                key={p.number}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: 12,
                  padding: "20px 22px",
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
                  {p.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#f5f5f5",
                    marginBottom: 8,
                  }}
                >
                  {p.title}
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
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <GradientBar height={1} />
      </div>
    </div>
  );
}
