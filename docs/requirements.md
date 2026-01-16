# NowLedge Requirements Definition

## 1. Project Overview

**NowLedge** is a technical blog platform designed for developers. It focuses on **freshness**, **low noise**, and **performance**. The name is a portmanteau of "Now" and "Knowledge", creating a space to share up-to-date technical information.

## 2. Goals

- **Simple & Modern**: A distraction-free, aesthetically pleasing UI.
- **High Performance**: Leveraging SolidJS for fine-grained reactivity and minimal overhead.
- **Freshness**: Algorithms and UI that prioritize new and relevant content.

## 3. Technology Stack

### Core

- **Framework**: SolidStart
- **Language**: TypeScript
- **Runtime**: Bun

### Data & Backend

- **Database**: Neon (Serverless Postgres)
- **ORM**: Drizzle ORM
- **RPC**: oRPC (End-to-end type safety)
- **Auth**: Better Auth (with Neon adapter)

### UI/UX

- **Styling**: Tailwind CSS (v4)
- **Components**: Shadcn Solid (Port of Shadcn UI)
- **Icons**: Lucide Solid

### Quality Control

- **Linter**: oxlint
- **Formatter**: oxfmt

## 4. Functional Requirements (MVP)

### User Management

- [ ] **Sign Up / Login**: Authentication via GitHub and Google.
- [ ] **Profile**: User profile pages with bio and article list.

### Article Management

- [ ] **CRUD**: Create, Read, Update, and Delete articles.
- [ ] **Editor**: Markdown editor with live preview.
- [ ] **Media**: Image upload support.
- [ ] **Organization**: Tagging and Categorization.

### Discovery & Engagement

- [ ] **Feed**: Home stream sorted by "Freshness".
- [ ] **Search**: Keyword and tag-based search.
- [ ] **Interactions**: Like / Benchmark (Stock) functionality.

## 5. Non-Functional Requirements

- **SEO**: Server-Side Rendering (SSR) for optimal indexing.
- **Performance**: Fast Time-to-First-Byte (TTFB) and minimal hydration blocking.
- **Accessibility**: Semantic HTML and keyboard navigation support.
