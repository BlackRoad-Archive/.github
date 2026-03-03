# Contributing to BlackRoad-Archive

Thank you for your interest in contributing! We welcome bug reports, feature requests, and pull requests from the community.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Reporting Security Issues](#reporting-security-issues)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## Getting Started

1. **Fork** the repository you want to contribute to.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/<repo>.git
   cd <repo>
   ```
3. **Create a branch** for your change:
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. Make your changes, following the [Style Guide](#style-guide).
5. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add new archive endpoint
   fix: resolve connection timeout in IPFS client
   docs: update deployment instructions
   chore: bump dependencies
   ```
6. **Push** and open a Pull Request against the `main` branch.

---

## How to Contribute

### 🐛 Bug Reports

Open an issue using the **Bug Report** template. Include:
- A clear title and description
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, runtime version, etc.)

### ✨ Feature Requests

Open an issue using the **Feature Request** template. Include:
- Problem statement (what you're trying to solve)
- Proposed solution
- Alternatives you considered

### 📚 Documentation

Improvements to docs are always welcome. Edit the relevant `.md` file and open a PR.

---

## Pull Request Process

1. Ensure your branch is up to date with `main` before opening a PR.
2. Fill in the PR template completely.
3. Link any related issues with `Closes #<issue-number>`.
4. Ensure all CI checks pass.
5. Request a review from at least one maintainer.
6. A maintainer will merge your PR once approved.

---

## Style Guide

- **Shell scripts:** Must pass `shellcheck --severity=error`.
- **GitHub Actions workflows:**
  - Pin all action versions to a full commit SHA.
  - Include `permissions:` blocks scoped to the minimum required.
  - Add `timeout-minutes:` to every job.
- **Markdown:** Follow the existing formatting and use the [Emoji Dictionary](BLACKROAD_EMOJI_DICTIONARY.md) for status indicators.

---

## Reporting Security Issues

**Please do not open public issues for security vulnerabilities.**

See [SECURITY.md](SECURITY.md) for our responsible disclosure process.

---

*© 2025–2026 BlackRoad OS, Inc. All rights reserved.*
