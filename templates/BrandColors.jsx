import { useState } from "react";

const COLORS = [
  { hex: "#FF6B2B", name: "Ember", token: "--accent-1" },
  { hex: "#FF2255", name: "Fuse", token: "--accent-2" },
  { hex: "#CC00AA", name: "Pulse", token: "--accent-3" },
  { hex: "#8844FF", name: "Drift", token: "--accent-4" },
  { hex: "#4488FF", name: "Signal", token: "--accent-5" },
  { hex: "#00D4FF", name: "Arc", token: "--accent-6" },
];

const GRAYS = [
  { hex: "#0a0a0a", name: "950" },
  { hex: "#171717", name: "900" },
  { hex: "#262626", name: "800" },
  { hex: "#404040", name: "700" },
  { hex: "#737373", name: "500" },
  { hex: "#a3a3a3", name: "400" },
  { hex: "#d4d4d4", name: "300" },
  { hex: "#f5f5f5", name: "100" },
];

function GradientBar({ height = 2 }) {
  const gradient = `linear-gradient(90deg, ${COLORS.map((c) => c.hex).join(", ")})`;
  return <div style={{ height, background: gradient, borderRadius: 2 }} />;
}

function ColorSwatch({ hex, name, token }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      onClick={handleCopy}
      style={{
        cursor: "pointer",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #1a1a1a",
        background: "#111",
      }}
    >
      <div style={{ height: 80, background: hex }} />
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#f5f5f5",
          }}
        >
          {name}
        </div>
        {token && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              marginTop: 2,
            }}
          >
            {token}
          </div>
        )}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: copied ? "#00D4FF" : "#737373",
            marginTop: 4,
          }}
        >
          {copied ? "Copied!" : hex}
        </div>
      </div>
    </div>
  );
}

function GraySwatch({ hex, name }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy gray color value to clipboard", error);
    }
  };
  const isLight = parseInt(name) <= 300;
  return (
    <div
      onClick={handleCopy}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        background: "#0d0d0d",
        border: "1px solid #1a1a1a",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: hex,
          border: "1px solid #262626",
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            color: "#d4d4d4",
          }}
        >
          Gray {name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: copied ? "#00D4FF" : "#525252",
          }}
        >
          {copied ? "Copied!" : hex}
        </div>
      </div>
    </div>
  );
}

export default function BrandColors() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "48px 24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <GradientBar height={3} />
        <div style={{ marginTop: 40, marginBottom: 48 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 10,
            }}
          >
            Brand Identity
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 700,
              color: "#f5f5f5",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Color System
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#525252",
              marginTop: 10,
              maxWidth: 480,
            }}
          >
            Six spectrum accents. Eight neutrals. One gradient that ties it all together.
          </p>
        </div>

        <div style={{ marginBottom: 48 }}>
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
            Spectrum Accents
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: 12,
            }}
          >
            {COLORS.map((c) => (
              <ColorSwatch key={c.hex} {...c} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
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
            Neutral Scale
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 8,
            }}
          >
            {GRAYS.map((g) => (
              <GraySwatch key={g.hex} {...g} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
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
            Signature Gradient
          </div>
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #1a1a1a",
            }}
          >
            <GradientBar height={64} />
            <div
              style={{
                padding: "12px 18px",
                background: "#111",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#525252",
              }}
            >
              linear-gradient(90deg, {COLORS.map((c) => c.hex).join(", ")})
            </div>
          </div>
        </div>

        <GradientBar height={1} />
      </div>
    </div>
  );
}
