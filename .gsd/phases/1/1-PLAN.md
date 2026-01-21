---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Project Foundation & Tools

## Objective

Establish the development foundation including tooling (Linting, Testing), Database schema (Drizzle), and Authentication (Better Auth) setup.

## Context

- .gsd/REQUIREMENTS.md
- .gsd/ARCHITECTURE.md
- .gsd/STACK.md
- package.json

## Tasks

<task type="auto">
  <name>Setup Tooling (Linting & Testing)</name>
  <files>package.json, tsconfig.json, .oxlintrc.json</files>
  <action>
    - Install dev dependencies for oxlint and SolidJS testing library.
    - Configure `tsconfig.json` for testing.
    - Add `lint` and `test` scripts to `package.json` (using `bun test`).
  </action>
  <verify>bun run lint && bun test</verify>
  <done>
    - [ ] `oxlint` runs without errors.
    - [ ] `bun test` runs (even if 0 tests).
  </done>
</task>

<task type="auto">
  <name>Database & Schema Implementation</name>
  <files>src/lib/db/schema.ts, src/lib/db/index.ts, drizzle.config.ts, .env</files>
  <action>
    - Install `drizzle-orm`, `drizzle-kit`, and `@neondatabase/serverless`.
    - Create `src/lib/db/schema.ts` with initial `users`, `accounts`, `sessions`, and `posts` tables.
    - Create `src/lib/db/index.ts` to initialize drizzle with Neon client.
    - Setup `drizzle.config.ts`.
    - Ensure `.env` has `DATABASE_URL`.
  </action>
  <verify>npx drizzle-kit check</verify>
  <done>
    - [ ] Drizzle schema is valid.
    - [ ] Schema matches Better Auth and NowLedge core requirements (posts).
  </done>
</task>

<task type="auto">
  <name>Authentication Setup (Better Auth)</name>
  <files>src/lib/auth.ts, src/routes/api/auth/[...auth].ts, src/middleware.ts</files>
  <action>
    - Install `better-auth`.
    - Create `src/lib/auth.ts` with Better Auth configuration (Drizzle adapter).
    - Implement the auth API route `src/routes/api/auth/[...auth].ts`.
    - Setup basic middleware/session logic for SolidStart.
  </action>
  <verify># Manual check of API route presence and config</verify>
  <done>
    - [ ] Auth config uses Drizzle adapter.
    - [ ] Auth API route is correctly defined.
  </done>
</task>

## Success Criteria

- [ ] Linting and testing pipelines are functional.
- [ ] Database schema is defined and ready for migration.
- [ ] Authentication layer is integrated with the database.
