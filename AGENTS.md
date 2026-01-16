# Project Overview
**NowLedge** is a modern technical blog platform built with SolidStart, aimed at providing a high-performance and fresh user experience similar to Qiita or Zenn.

## Tech Stack
- **Framework**: SolidStart (Vinxi)
- **Runtime**: Bun
- **Database**: Neon (Postgres)
- **ORM**: Drizzle ORM
- **Auth**: Better Auth
- **UI**: Tailwind CSS (v4) + Shadcn Solid (Components expected)
- **Deployment**: Cloudflare Workers

## Folder Structure

### `/src`
- **`/routes`**: Contains the file-system routing for the application.
- **`/lib`**: Utility functions, including database connections and authentication configurations.
- **`/db`**: Database schema definitions and Drizzle ORM configurations.
- **`app.tsx`**: The main application entry point.
- **`app.css`**: Global styles, including Tailwind CSS imports.
- **`entry-client.tsx` / `entry-server.tsx`**: Entry points for client-side and server-side rendering.

### `/docs`
- **`requirements.md`**: detailed requirements definition for the projects.

### Root Files
- **`package.json`**: Project dependencies and scripts.
- **`wrangler.toml`**: Configuration for Cloudflare Workers deployment.
- **`drizzle.config.ts`**: Configuration for Drizzle Kit.
- **`app.config.ts`**: Configuration for SolidStart/Vinxi.

## Project Rules & Guidelines

1.  **Package Manager**: Use **Bun** for all package management and script execution (`bun install`, `bun dev`, `bun run deploy`).
2.  **Linting & Formatting**:
    - Use **oxlint** for linting: `bun run lint`
    - Use **oxfmt** for formatting: `bun run format`
3.  **Database**:
    - Use **Drizzle ORM** for all database interactions.
    - Schema changes should be pushed using `bun run drizzle-kit push` (or via migration scripts if set up).
4.  **Styling**:
    - Use **Tailwind CSS v4**.
    - Styles are defined in `src/app.css` or utility classes directly in components.
5.  **Authentication**:
    - **Better Auth** is the designated authentication solution.
6.  **Environment Variables**:
    - Ensure `.env` is properly configured with `DATABASE_URL`, `BETTER_AUTH_SECRET`, and OAuth credentials.
