# ADR.md — Architectural Decision Records

> **Status**: `ACTIVE`

## ADR-001: Technology Stack Selection

- **Date**: 2026-01-20
- **Context**: Need a modern, fast, and scalable full-stack framework.
- **Decision**: SolidStart + Neon PostgreSQL + Cloudflare Pages.
- **Rationale**:
  - SolidStart provides excellent performance and fine-grained reactivity.
  - Neon PG with pg_search allows sophisticated ranking in SQL.
  - Cloudflare Pages offers edge deployment and great DX.

## ADR-002: Ranking Algorithm

- **Date**: 2026-01-20
- **Context**: Need to prioritize "fresh" information.
- **Decision**: Hybrid score = `Relevance * FreshnessWeight * StalePenalty`.
- **Rationale**: Balances keyword relevance with information decay and community signals.
