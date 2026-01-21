# NowLedge

**Find what works now.**

NowLedge is a freshness-first technical blogging and discovery platform. It helps developers find solutions that still work by prioritizing recently updated and recently verified posts in search, while clearly labeling content that may be outdated.

---

## Table of Contents

- [NowLedge](#nowledge)
  - [Table of Contents](#table-of-contents)
  - [Key Concepts](#key-concepts)
  - [Features](#features)
    - [Content](#content)
    - [Publishing](#publishing)
    - [Community](#community)
    - [Freshness System](#freshness-system)
    - [Search](#search)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [Create \& Publish](#create--publish)
    - [Verify a Post](#verify-a-post)
    - [Mark as Outdated](#mark-as-outdated)
    - [Community Notes](#community-notes)
    - [Search](#search-1)
  - [Ranking Model](#ranking-model)
    - [Freshness Base Time](#freshness-base-time)
    - [Final Score (conceptual)](#final-score-conceptual)
    - [Freshness Weight (recommended MVP defaults)](#freshness-weight-recommended-mvp-defaults)
    - [Outdated Penalty](#outdated-penalty)
    - [Warning Thresholds (recommended MVP defaults)](#warning-thresholds-recommended-mvp-defaults)
    - [Trust Weights (simple MVP)](#trust-weights-simple-mvp)
  - [Moderation \& Anti-Spam](#moderation--anti-spam)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

---

## Key Concepts

- **Freshness-first**: Search ranks content by _relevance × freshness_, not by popularity alone.
- **Verification**: Authors can confirm a post still works (e.g., after re-testing).
- **Outdated signals**: Readers can flag posts as outdated with a reason; this affects ranking and UI warnings.
- **Evergreen content**: Some topics remain valid long-term (e.g., Git fundamentals). Evergreen reduces freshness decay, but never disables outdated warnings.

---

## Features

### Content

- Markdown posts with preview
- Images upload (MVP)
- Table of contents generation (from headings)
- Version history (every edit is stored)

### Publishing

- Drafts
- Visibility controls:
  - **Public**: visible in listings/search
  - **Unlisted**: accessible by link, not indexed/listed
  - **Private**: author-only

### Community

- Threaded comments
- Reactions: 👍 and emoji reactions
- User follow
- Review requests via unlisted links (plus optional reviewer targeting among followed users)

### Freshness System

- Author **Verify** action (`verifiedAt`)
- Reader **Outdated** action (category required, free-text optional)
- Community Notes (proposal → adopted note)

### Search

- Index: title/body (Markdown), tags, comments
- Filters:
  - Time range (e.g., 7d/30d/1y/custom)
  - Language tags
  - Verified-only
  - Exclude outdated (Strong Warning)

---

## Architecture

- **Web Framework**: [SolidStart](https://start.solidjs.com/) (SSR Required)
- **Runtime/Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) (MVP Recommendation)
- **Database**: [Neon Postgres](https://neon.tech/)
- **Connectivity**: [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) + Neon serverless driver
- **Search Engine**: [Neon pg_search](https://neon.tech/docs/extensions/pg_search) (ParadeDB)
- **Authentication**: [BetterAuth](https://www.better-auth.com/)
- **Storage**: [Cloudflare R2](https://developers.cloudflare.com/r2/)
- **Ranking Engine**: SQL-based hybrid model (BM25 × Freshness × Penalty)

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js
- [Neon](https://neon.tech/) Project (Postgres)
- [Cloudflare](https://cloudflare.com/) Account (for Pages, R2, and Hyperdrive)
- OAuth credentials (for BetterAuth providers)

### Installation

```bash
# 1) Install dependencies
bun install
# or
npm install

# 2) Start development server
bun dev
# or
npm run dev
```

### Environment Variables

Create a `.env` file (see `.env.example` if available):

```bash
# App
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="..."

# Database
DATABASE_URL="postgres://..." # Neon connection string
# Hyperdrive URL (for production)
HYPERDRIVE_URL="postgres://..."

# Storage (Cloudflare R2)
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="..."
R2_ENDPOINT="..."

# OAuth Providers
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

---

## Usage

### Create & Publish

1. Sign in
2. Create a post (Markdown)
3. Choose:
   - Draft / Published
   - Public / Unlisted / Private

4. Publish

### Verify a Post

Use **Verify** when you re-tested a post and confirmed it still works. This updates `verifiedAt` and boosts freshness.

### Mark as Outdated

Readers can mark a post as **Outdated** by selecting a category (required):

- API/spec changed
- Steps inaccurate
- Environment-dependent
- Link rot
- Security concern
- Other

Optional: add a short note describing what broke and what to use instead.

### Community Notes

Community Notes are designed to reduce noise without derailing the main post:

- **Proposals**: eligible users can propose a note
- **Adoption**: a note becomes “Community Note” by:
  - author approval (primary path), or
  - community “helpful” votes reaching the adoption threshold

### Search

Search results are ranked by relevance _and_ freshness. Use filters to narrow down to:

- recently updated/verified content
- verified-only posts
- non-outdated posts (exclude Strong Warning)

---

## Ranking Model

### Freshness Base Time

```text
freshnessBaseAt = max(updatedAt, verifiedAt)
```

### Final Score (conceptual)

```text
FinalScore = RelevanceScore * FreshnessWeight * StalePenalty
```

### Freshness Weight (recommended MVP defaults)

- For non-evergreen posts:

```text
FreshnessWeight = exp(-ageDays / 30)
```

- For evergreen posts:

```text
FreshnessWeight = exp(-ageDays / 120)
```

### Outdated Penalty

- Each outdated vote is **trust-weighted**
- Votes older than the current `freshnessBaseAt` are **down-weighted** (e.g., 0.5×), so re-verification can recover ranking without erasing history

```text
StalePenalty = 1 / (1 + 0.5 * weightedStale)
```

### Warning Thresholds (recommended MVP defaults)

- **Warning**
  - `uniqueVoters >= 2` AND `weightedStale >= 1.5`

- **Strong Warning**
  - `uniqueVoters >= 3` AND `weightedStale >= 3.0`
  - Included in “Exclude outdated” filter

### Trust Weights (simple MVP)

- account age < 7 days: 0.25
- 7–30 days: 0.5
- 30+ days: 1.0

---

## Moderation & Anti-Spam

Recommended MVP protections:

- Rate limits for:
  - posting, commenting, reacting
  - outdated votes
  - note proposals

- Outdated vote requirements:
  - category required
  - one vote per user per post

- Notes controls:
  - proposal eligibility gate (e.g., 7 days old account OR 1 public post)
  - per-day proposal caps
  - limit external links for new accounts

- Reporting:
  - report post/comment/note for admin review

---

## Roadmap

- Notifications (in-app, then email)
- Tag follow
- Advanced diff UI for post versions
- Better trust model (signals from accepted suggestions, sustained contributions)
- Organization/team spaces
- Monetization options (out of MVP scope)

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Add tests (if applicable)
4. Open a pull request with a clear description and screenshots/logs when relevant

Suggested areas:

- Search relevance tuning
- Ranking parameterization and evaluation
- Anti-spam and trust signals
- Community Notes UX

---

## License

Add your chosen license here (e.g., MIT, Apache-2.0) and include a `LICENSE` file.

---

## Acknowledgements

- README structure inspired by the “Awesome README” collection. ([GitHub][1])

[1]: https://github.com/matiassingers/awesome-readme 'GitHub - matiassingers/awesome-readme: A curated list of awesome READMEs'

```

```
