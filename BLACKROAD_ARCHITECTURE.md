# BlackRoad Architecture Overview

> **The Core Thesis:** BlackRoad is a routing company, not an AI company.

---

## Executive Summary

We don't train models or buy GPUs. We connect users to intelligence that already exists (Claude, GPT, Llama, NumPy, legal databases, etc.) through an orchestration layer we own.

**The insight:** Intelligence is already trained. Libraries already exist. The value is in routing requests to the right tool at the right time—not in building another brain.

---

## Infrastructure (~$40/month recurring)

| Layer | Service | Role |
|-------|---------|------|
| Edge/CDN | Cloudflare | Handles millions of connections, DNS, DDoS |
| CRM/Data | Salesforce (Free Dev Edition) | Customer data, 15K API calls/day |
| Code/CI | GitHub Enterprise | 15 organizations, deployment |
| Mesh Network | Tailscale | Private encrypted connections between nodes |
| Cloud Node | Digital Ocean (Shellfish) | Internet-facing server |

---

## Hardware (Owned, Not Rented)

A Raspberry Pi cluster running specialized roles:

| Node | Hardware | Role |
|------|----------|------|
| **lucidia** | Pi 5 + Pironman + Hailo-8 | Salesforce sync, RoadChain/Bitcoin |
| **octavia** | Pi 5 + Pironman + Hailo-8 | AI routing decisions (26 TOPS), 3D printing |
| **aria** | Pi 5 | Agent orchestration, Cloudflare Workers |
| **alice** | Pi 400 | Kubernetes + VPN hub (mesh root) |
| **shellfish** | Digital Ocean droplet | Public-facing gateway |

Plus dev machines (Mac = "cecilia", iPhone = "arcadia") and edge devices (ESP32s, LoRa modules for future deployment).

### Local Inference Specifications

| Component | Technical Specification | Functional Role |
|-----------|------------------------|-----------------|
| Compute Node | Raspberry Pi 5 (8GB LPDDR4X) | General Purpose Inference and Control |
| Inference Accelerator | Raspberry Pi AI Hat 2 (40 TOPS) | Dedicated INT8 LLM Processing |
| Network Layer | Gigabit Ethernet with PoE+ HAT | Synchronized Node Communication |
| Storage | NVMe SSD (M.2 Interface, 256GB+) | Model Weights and Agent Memory |
| Software Stack | LiteLLM Proxy / Ollama / llama.cpp | API Hosting and Load Balancing |

The Raspberry Pi AI Hat 2 (Hailo 10H NPU) enables efficient processing of quantized GGUF models, achieving 5–15 tokens per second in clustered configurations using OpenMPI for parallelization. The NPU allows larger models beyond what the Pi 5 CPU alone can handle.

### Copilot Offloading via Local LiteLLM Proxy

To bypass centralized rate limits and keep proprietary codebase context local, the system redirects GitHub Copilot traffic to the Pi cluster:

```bash
export GH_COPILOT_OVERRIDE_PROXY_URL="http://raspberrypi.local:4000"
```

The LiteLLM proxy translates requests into an OpenAI-compatible format and distributes them across the cluster using round-robin load balancing.

---

## The Control Plane

```
┌─────────────────────────────────────────────────────────────┐
│              BLACKROAD UNIFIED CONTROL                       │
├─────────────────┬─────────────────┬─────────────────────────┤
│   SALESFORCE    │   CLOUDFLARE    │      GITHUB             │
│   CRM + API     │   Edge + DNS    │    Code + CI            │
└────────┬────────┴────────┬────────┴──────────┬──────────────┘
         │                 │                   │
         └────────────────┬┴───────────────────┘
                          ▼
                    ┌──────────┐
                    │ OPERATOR │  ← We own this
                    └────┬─────┘
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐    ┌──────────┐    ┌─────────┐
    │ lucidia │    │ octavia  │    │  aria   │
    │ SF/Chain│    │ Hailo-8  │    │ Agents  │
    └────┬────┘    └────┬─────┘    └────┬────┘
         └───────────────┼───────────────┘
                         ▼
                    ┌─────────┐
                    │  alice  │  ← K8s + VPN hub
                    └─────────┘
```

**Key insight:** The OPERATOR sits between us and all external services. Cloudflare, Salesforce, and GitHub are utilities we command—not landlords we rent from. The control plane lives on hardware we own.

---

## The Routing Pattern

```
[User Request] → [Operator] → [Route to Right Tool] → [Answer]
                     │
                     ├── Physics question? → NumPy/SciPy
                     ├── Language task? → Claude/GPT API
                     ├── Customer lookup? → Salesforce API
                     ├── Legal question? → Legal database
                     └── Fast inference? → Hailo-8 local
```

The agent doesn't need to be smart. It needs to know **who to call.**

---

## The @BlackRoadBot Routing Matrix

When a user comments `@BlackRoadBot` on a GitHub issue or pull request, the bot identifies target platforms based on natural language intent and routes to the appropriate API.

### Salesforce CRM Integration

- **Task Creation:** Apex middleware triggers a Case or Custom Task object in Salesforce.
- **Data Activation:** Salesforce Data Cloud ingests telemetry from GitHub webhooks for real-time analytics.
- **Webhooks:** GitHub triggers are wired directly to Salesforce endpoints via `salesforce-webhooks`.

### Hugging Face and Ollama Reasoning

- **Hugging Face Inference Endpoints:** Programmatic deployment of dedicated model endpoints for high-compute tasks exceeding local Pi cluster capacity.
- **Ollama Integration:** Routine inference via the Ollama API, exposed through a Cloudflare Tunnel (e.g., `bartowski/Llama-3.2-3B-Instruct-GGUF`).

### DigitalOcean and Railway Infrastructure

- **DigitalOcean Droplets:** Managed via `doctl` CLI within GitHub Actions for rebuilds and scaling.
- **Railway Deployments:** Ephemeral test environments for new feature branches via Railway CLI.

---

## The Business Model

| What We Own | What We Don't Need |
|-------------|-------------------|
| Customer relationships | Training models |
| Routing/orchestration logic | GPUs |
| Data and state | Data centers |
| The Operator | The intelligence itself |

When better models come out, we add them to the router. Infrastructure stays the same.

---

## The Math

At $1/user/month:

- 1M users = $12M/year
- 100M users = $1.2B/year
- 1B users = $12B/year

Ceiling: everyone who ever talks to AI.

---

## Organization Structure

BlackRoad operates across 15 specialized GitHub organizations within the [GitHub Enterprise](https://github.com/enterprises/blackroad-os) environment. Each organization is a routing target for `@blackroad-agents` task distribution, implementing the principle of least privilege across functional domains.

| Organization | Primary Responsibility | Repository Examples |
|--------------|------------------------|---------------------|
| **Blackbox-Enterprises** | Corporate and Enterprise Integrations | `blackbox-api`, `enterprise-bridge` |
| **BlackRoad-AI** | Core LLM and Reasoning Engine Development | `lucidia-core`, `blackroad-reasoning` |
| **BlackRoad-Archive** | Long-term Data Persistence and Documentation | `blackroad-os-docs`, `history-ledger` |
| **BlackRoad-Cloud** | Infrastructure as Code and Orchestration | `cloud-orchestrator`, `railway-deploy` |
| **BlackRoad-Education** | Onboarding and Documentation Frameworks | `br-help`, `onboarding-portal` |
| **BlackRoad-Foundation** | Governance and Protocol Standards | `protocol-specs`, `governance-rules` |
| **BlackRoad-Gov** | Regulatory Compliance and Policy Enforcement | `compliance-audit`, `regulatory-tools` |
| **BlackRoad-Hardware** | SBC and IoT Device Management | `blackroad-agent-os`, `pi-firmware` |
| **BlackRoad-Interactive** | User Interface and Frontend Systems | `blackroad-os-web`, `interactive-ui` |
| **BlackRoad-Labs** | Experimental R&D and Prototyping | `experimental-agents`, `quantum-lab` |
| **BlackRoad-Media** | Content Delivery and Public Relations | `media-engine`, `pr-automation` |
| **BlackRoad-OS** | Core System Kernel and CLI Development | `blackroad-cli`, `kernel-source` |
| **BlackRoad-Security** | Auditing, Cryptography, and Security | `security-audit`, `hash-witnessing` |
| **BlackRoad-Studio** | Production Assets and Creative Tooling | `lucidia-studio`, `creative-assets` |
| **BlackRoad-Ventures** | Strategic Growth and Ecosystem Funding | `tokenomics-api`, `venture-cap` |

Cross-organization access is managed via GitHub Apps (preferred over PATs for their short-lived, granular permissions).

---

## Domain Registry

All domains are orchestrated via Cloudflare. Cloudflare Tunnels securely expose local Pi nodes to the public internet for inference without exposing internal ports.

| Domain | Functional Use Case | Associated Organization |
|--------|---------------------|-------------------------|
| `blackboxprogramming.io` | Developer Education and APIs | Blackbox-Enterprises |
| `blackroad.io` | Core Project Landing Page | BlackRoad-OS |
| `blackroad.company` | Corporate and HR Operations | BlackRoad-Ventures |
| `blackroad.me` | Personal Agent Identity Nodes | BlackRoad-AI |
| `blackroad.network` | Distributed Network Interface | BlackRoad-Cloud |
| `blackroad.systems` | Infrastructure and System Ops | BlackRoad-Cloud |
| `blackroadai.com` | AI Research and API Hosting | BlackRoad-AI |
| `blackroadinc.us` | US-based Governance and Legal | BlackRoad-Gov |
| `blackroadqi.com` | Quantum Intelligence Research | BlackRoad-Labs |
| `blackroadquantum.com` | Primary Quantum Lab Interface | BlackRoad-Labs |
| `blackroadquantum.store` | Quantum Research Assets | BlackRoad-Labs |
| `blackroadquantum.info` | Quantum Documentation | BlackRoad-Labs |
| `lucidia.earth` | Memory Layer and Personal AI | BlackRoad-AI |
| `lucidia.studio` | Creative and Asset Management | BlackRoad-Studio |
| `roadchain.io` | Blockchain and Witnessing Ledger | BlackRoad-Security |
| `roadcoin.io` | Tokenomics and Financial Interface | BlackRoad-Ventures |

---

## The @blackroad-agents Deca-Layered Scaffold

Every task triggered by `@blackroad-agents` flows through a ten-step scaffold ensuring review, distribution, and deployment fidelity.

### 1. Initial Reviewer

A Layer 6 (Lucidia Core) agent reviews the incoming request for clarity, security compliance, and resource availability. It determines the intent and generates a preliminary execution plan.

### 2. Task Distributor to Organization

The task is routed to one of the fifteen BlackRoad organizations based on functional domain (hardware, security, cloud, etc.).

### 3. Task Distribution to Team

Within the selected organization, the task is refined and distributed to a specific team. Human-in-the-loop (HITL) gates pause execution for manual approval on high-risk operations (e.g., modifying production firewall rules).

### 4. Task Update to Project

The task is recorded in a GitHub Project board. Metadata (Request ID, timeline) is synchronized with Salesforce for enterprise-level audit trails.

### 5. Task Distribution to Agent

A specialized autonomous agent is instantiated or assigned (e.g., `fastapi-coder-agent`, `doctl-infrastructure-agent`). Agents follow the Planner-Executor-Reflector design pattern.

### 6. Task Distribution to Repository

The agent identifies the target repository and creates a new branch following GitHub Flow branching strategy for isolated testing.

### 7. Task Distribution to Device

Tasks requiring physical execution (firmware deployment to Raspberry Pi, DigitalOcean Droplet rebuilds) are routed to the device layer for local hardware offloading.

### 8. Task Distribution to Drive

Artifacts (logs, reports, documentation) are distributed to Google Drive via a Service Account (GSA) with consistent write access to enterprise shared drives.

### 9. Task Distribution to Cloudflare

Network configuration changes (new Cloudflare Tunnels, DNS record modifications) are executed to make newly deployed services immediately reachable and secured.

### 10. Task Distribution to Website Editor

Changes are routed to the presentation layer via AI-driven website editors (Wix Harmony/Aria, Elementor Angie) or headless CMS frameworks (Strapi, Sanity) for autonomous content generation.

---

## BlackRoad CLI v3 — Layered Architecture

The CLI loads eight distinct layers of functionality:

| Layer | Name | Responsibility |
|-------|------|----------------|
| 3 | Agents/System | Autonomous agent lifecycle management and system processes |
| 4 | Deploy/Orchestration | Infrastructure provisioning across cloud and local nodes |
| 5 | Branches/Environments | Ephemeral environments and git-branching logic for agentic tests |
| 6 | Lucidia Core/Memory | Long-term context, state transitions, and simulation data |
| 7 | Orchestration | High-level task distribution powering the @blackroad-agents scaffold |
| 8 | Network/API | REST and GraphQL endpoints for the @BlackRoadBot matrix |

A failure in Layer 8 (Network) does not affect persistence of state in Layer 6 (Memory).

---

## roadchain — Witnessing Architecture

Unlike traditional blockchains focused on consensus-based proof, roadchain functions as a "witnessing" architecture.

- Every state transition (agent code commits, bot routing events) is hashed using **SHA-256** and appended to a non-terminating ledger.
- This creates an immutable record of **what happened** rather than **what is true**.
- The genesis block is represented by sixty-four zeros (the "Trivial Zero" principle).

### Theoretical Mapping

| Mathematical Concept | BlackRoad Architectural Mapping |
|----------------------|--------------------------------|
| Trivial Zeros (Riemann) | The Genesis Block (sixty-four zeros) |
| Non-Trivial Zeros | High-value, complex agentic tasks |
| Euler's Equation | Compiler check for system integrity |
| Cantor's Diagonalization | Escaping finite lists via sideway execution |
| Feynman's Path Integral | Rendering engine for multi-agent execution |
| Pi | Non-terminating, local copy of the system state |

---

## Rate Limit Mitigation Strategies

| Provider | Observed Limit | Mitigation Protocol |
|----------|---------------|---------------------|
| GitHub Copilot | RPM / Token Exhaustion | Redirect to local Raspberry Pi LiteLLM proxy |
| Hugging Face Hub | IP-based Rate Limit | Rotate `HF_TOKEN` or use authenticated SSH keys |
| Google Drive | Individual User Quota | Use Shared Drives with GSA "Content Manager" role |
| DigitalOcean API | Concurrent Build Limits | Queue tasks via Layer 7 Orchestration |
| Salesforce API | Daily API Request Cap | Batch updates via Data Cloud Streaming Transforms |

When a task fails at any scaffold layer, the system creates a GitHub Issue with detailed Layer 6 (Lucidia Core) logs. A "Reflect and Retry" plugin then assesses the failure.

---

## Future Scaling: 30k Agents

The `blackroad-30k-agents` repository targets orchestration of 30,000 autonomous agents using Kubernetes auto-scaling and self-healing. This will require transitioning from Raspberry Pi clusters to larger ARM-based data centers mirroring the decentralized witnessing architecture of roadchain.

---

## Implementation Guide

The FastAPI pattern is the starting point:

1. **Expose endpoints** (`/physics/hydrogen`, `/relativity/time-dilation`)
2. **Operator routes** (keyword matching → right function)
3. **Log everything** (JSON audit trail → future ledger)

This is the Operator pattern in miniature. Start with physics, extend to every domain.

---

## Verification

- **Source of Truth:** GitHub (BlackRoad-OS) + Cloudflare
- **Hash Verification:** PS-SHA-∞ (infinite cascade hashing)
- **Authorization:** Alexa's pattern via Claude/ChatGPT

---

*Last Updated: 2026-02-27*
*BlackRoad OS, Inc. - Proprietary and Confidential*
