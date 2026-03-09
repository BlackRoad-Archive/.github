import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const PLANS = [
  {
    name: "Open",
    price: "0",
    period: "",
    desc: "For learners, explorers, and anyone who just wants to see what this is.",
    features: [
      "Full K-12 RoadWork access",
      "Lucidia chat — 50 messages/day",
      "RoadView search — unlimited",
      "BackRoad social — full access",
      "1 AI agent companion",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Builder",
    price: "10",
    period: "/mo",
    desc: "For creators, students, and independent professionals building real things.",
    features: [
      "Everything in Open",
      "Unlimited Lucidia chat + code",
      "RoadGlitch automations — 100/mo",
      "SoundRoad — 10 tracks/mo",
      "Genesis Road — basic 3D",
      "VaultRoad second brain — 10GB",
      "5 AI agents with memory",
      "CashRoad financial co-pilot",
      "Priority support",
    ],
    cta: "Start Building",
    highlight: true,
  },
  {
    name: "Studio",
    price: "29",
    period: "/mo",
    desc: "For teams, studios, and serious creators who need the full stack.",
    features: [
      "Everything in Builder",
      "Unlimited automations",
      "SoundRoad — unlimited tracks",
      "Genesis Road — full engine",
      "VaultRoad — 100GB",
      "25 AI agents with persistent memory",
      "RoadWorld — publish & earn",
      "80% revenue on all content",
      "API access",
      "Team collaboration — up to 5",
    ],
    cta: "Go Studio",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For schools, organizations, and companies that need the OS at scale.",
    features: [
      "Everything in Studio",
      "Unlimited agents",
      "Custom agent training",
      "Dedicated infrastructure",
      "SSO / SAML / SCIM",
      "Compliance & audit logs",
      "Outcome-based pricing for schools",
      "SLA guarantee",
      "Dedicated support engineer",
    ],
    cta: "Talk to Us",
    highlight: false,
  },
];

const FAQS = [
  { q: "What's outcome-based pricing?", a: "Schools pay per successful student outcome — not per seat. If a student doesn't learn, you don't pay. We believe in aligning incentives with actual results." },
  { q: "Can I switch plans anytime?", a: "Yes. Upgrade instantly, downgrade at end of billing cycle. No contracts, no cancellation fees, no friction." },
  { q: "What does 80% creator revenue mean?", a: "When you publish content, sell assets, or earn through the ecosystem, you keep 80%. Compare that to Roblox at 29%, YouTube at 55%, or Spotify at roughly 0.3%." },
  { q: "What's an AI agent with memory?", a: "Each agent has persistent memory via PS-SHA∞ hashing. They remember every interaction, evolve over time, and develop individual capabilities. They're teammates, not tools." },
  { q: "Is my data portable?", a: "Always. Export everything — your content, your audience contacts, your agent configurations, your vault. You own it all." },
  { q: "Do you sell my data?", a: "No. Ever. Your data trains nothing except your own agents. BlackRoad is funded by subscriptions and creator revenue sharing — not surveillance." },
];

const COMPARISONS = [
  { feature: "Creator revenue share", blackroad: "80%", others: "29–55%" },
  { feature: "Data ownership", blackroad: "Full export", others: "Platform-locked" },
  { feature: "AI agents with memory", blackroad: "Up to 1,000", others: "None" },
  { feature: "Search verification", blackroad: "Confidence scored", others: "SEO-driven" },
  { feature: "Social metrics", blackroad: "Hidden by design", others: "Vanity-first" },
  { feature: "Admin automation", blackroad: "Zero-friction OS", others: "Manual" },
];

function GradientBar({ height = 2, style = {} }) {
  return <div style={{ height, background: GRADIENT, borderRadius: 2, ...style }} />;
}

function PlanCard({ plan }) {
  return (
    <div
      style={{
        background: plan.highlight ? "#111" : "#0d0d0d",
        border: `1px solid ${plan.highlight ? "#2a2a2a" : "#1a1a1a"}`,
        borderRadius: 14,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {plan.highlight && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRADIENT }} />
      )}
      {plan.highlight && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "#FF6B2B",
            background: "#FF6B2B15",
            padding: "3px 8px",
            borderRadius: 4,
            border: "1px solid #FF6B2B30",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Popular
        </div>
      )}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#f5f5f5",
          marginBottom: 8,
        }}
      >
        {plan.name}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 12 }}>
        {plan.price === "Custom" ? (
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#f5f5f5",
            }}
          >
            Custom
          </span>
        ) : (
          <>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                color: "#525252",
                marginTop: 4,
              }}
            >
              $
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: "#f5f5f5",
                lineHeight: 1,
              }}
            >
              {plan.price}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#525252",
              }}
            >
              {plan.period}
            </span>
          </>
        )}
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: "#525252",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}
      >
        {plan.desc}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flexGrow: 1 }}>
        {plan.features.map((f) => (
          <li
            key={f}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#737373",
              padding: "5px 0",
              borderBottom: "1px solid #141414",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: "#525252", flexShrink: 0 }}>—</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        style={{
          background: plan.highlight ? GRADIENT : "transparent",
          border: plan.highlight ? "none" : "1px solid #262626",
          borderRadius: 8,
          padding: "10px 0",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: plan.highlight ? "#0a0a0a" : "#a3a3a3",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "64px 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <GradientBar height={3} />

        {/* Header */}
        <div style={{ textAlign: "center", margin: "64px 0 56px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 14,
            }}
          >
            Pricing
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
            Simple. Honest. Aligned.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: "#525252",
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            No dark patterns. No upsell traps. Pick the tier that matches how you actually use it.
          </p>
        </div>

        {/* Plans Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 14,
            marginBottom: 72,
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Comparison Table */}
        <div style={{ marginBottom: 72 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            How We Compare
          </div>
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 140px",
                padding: "10px 18px",
                borderBottom: "1px solid #141414",
              }}
            >
              {["Feature", "BlackRoad", "Others"].map((h) => (
                <div
                  key={h}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#404040",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {COMPARISONS.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px 140px",
                  padding: "12px 18px",
                  borderBottom: i < COMPARISONS.length - 1 ? "1px solid #141414" : "none",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#737373",
                  }}
                >
                  {row.feature}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#d4d4d4",
                    fontWeight: 500,
                  }}
                >
                  {row.blackroad}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#404040",
                  }}
                >
                  {row.others}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            FAQ
          </div>
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: i < FAQS.length - 1 ? "1px solid #141414" : "none" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "16px 18px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "#d4d4d4",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: "#525252", fontSize: 18 }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 18px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#525252",
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <GradientBar height={1} />
      </div>
    </div>
  );
}
