# RESEARCH.md — Project Research

> **Status**: `IN PROGRESS`

## Topics to Investigate

### 1. Neon pg_search (ParadeDB) Hybrid Ranking

- **Goal**: Implement `FinalScore = RelevanceScore * FreshnessWeight * StalePenalty` in SQL.
- **Key Questions**:
  - How to retrieve the BM25 relevance score from `pg_search`.
  - How to combine this score with custom SQL functions (e.g., `exp(-ageDays / 30)`).
  - Performance considerations for real-time ranking.

### 2. SolidStart + Better Auth + Cloudflare Pages Stack

- **Goal**: Ensure stable SSR and authentication flow.
- **Key Questions**:
  - Middleware setup for session handling in SolidStart.
  - Integration with Cloudflare Pages (Adapters, Environment Variables).
  - Drizzle ORM integration with Neon Hyperdrive on Cloudflare.

---

## Findings

### Topic 1: Neon pg_search (ParadeDB)

- **BM25 Scoring**: `pg_search` uses the BM25 algorithm. The score can be retrieved in a SQL query using the `paradedb.score(id)` function.
- **Hybrid Search**: We can use a CTE to get the relevance score and then multiply it by our freshness and penalty factors in the final SELECT.
- **Example Query Pattern**:
  ```sql
  WITH search_results AS (
    SELECT id, paradedb.score(id) as relevance_score
    FROM posts
    WHERE content @@@ 'search query'
  )
  SELECT
    p.*,
    (s.relevance_score * exp(-age_days / 30) * (1 / (1 + 0.5 * weighted_stale))) as final_score
  FROM posts p
  JOIN search_results s ON p.id = s.id
  ORDER BY final_score DESC;
  ```

### Topic 2: SolidStart + Better Auth + Cloudflare

- **Handler Configuration**: Use `toSolidStartHandler` from `better-auth/solid-start` in `src/routes/api/auth/[...auth].ts`.
- **Middleware**: SolidStart's `createMiddleware` can be used to protect routes or inject session data into the context.
- **Hyperdrive**: Neon Hyperdrive connection strings should be used in production (Cloudflare environment variables) to manage connection pooling efficiently.
- **SSR Compatibility**: Better Auth session retrieval works seamlessly in SolidStart's `cache` and `createAsync` functions using the `auth.api.getSession()` method.
