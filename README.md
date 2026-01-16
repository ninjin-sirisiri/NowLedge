# NowLedge

**NowLedge** is a modern technical blog platform built with SolidStart, focusing on performance and freshness.

## 🚀 Tech Stack

- **Framework**: [SolidStart](https://start.solidjs.com)
- **Runtime**: [Bun](https://bun.sh)
- **Database**: [Neon](https://neon.tech) (Postgres)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Auth**: [Better Auth](https://better-auth.com)
- **UI**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn Solid](https://shadcn-solid.com)

## 🛠️ Setup

### Prerequisites

- [Bun](https://bun.sh) installed (`v1.x` or later)
- A [Neon](https://neon.tech) database project

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd nowledge
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and fill in your credentials.

   ```bash
   cp .env.example .env
   ```

   _Required variables:_
   - `DATABASE_URL`: Your Neon connection string.
   - `BETTER_AUTH_SECRET`: Random string for auth encryption.
   - `GITHUB_CLIENT_ID` / `SECRET`: For GitHub auth.
   - `GOOGLE_CLIENT_ID` / `SECRET`: For Google auth.

4. Push database schema:
   ```bash
   bun run drizzle-kit push
   ```

### Development

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/routes` - File-system routing
- `/src/components` - UI components
- `/src/lib` - Utilities (Auth, DB, etc.)
- `/src/db` - Database schema
- `/docs` - Documentation
