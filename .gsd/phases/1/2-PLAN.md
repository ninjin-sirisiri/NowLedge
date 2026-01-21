---
phase: 1
plan: 2
wave: 2
---

# Plan 1.2: Core Posting Implementation (MVP)

## Objective

Implement basic Markdown post creation, listing, and visibility controls as defined in REQ-POST-01 and REQ-POST-02.

## Context

- .gsd/REQUIREMENTS.md
- src/lib/db/schema.ts
- src/lib/auth.ts

## Tasks

<task type="auto">
  <name>Markdown Editor & Post Creation</name>
  <files>src/components/Editor.tsx, src/routes/posts/new.tsx, src/lib/api/posts.ts</files>
  <action>
    - Install `solid-markdown` or similar for preview.
    - Create a basic Markdown editor component with preview.
    - Implement a protected route `src/routes/posts/new.tsx` for creating posts.
    - Add server functions to save posts to the database.
  </action>
  <verify># To be verified with browser screenshot in execution</verify>
  <done>
    - [ ] Markdown preview works.
    - [ ] Authenticated users can save posts.
  </done>
</task>

<task type="auto">
  <name>Post Listing & Visibility Controls</name>
  <files>src/routes/posts/[id].tsx, src/routes/index.tsx, src/lib/db/schema.ts</files>
  <action>
    - Implement visibility logic (Public/Unlisted/Private) in the post schema and retrieval.
    - Create a post detail page `src/routes/posts/[id].tsx`.
    - Update home page `src/routes/index.tsx` to list public posts.
  </action>
  <verify># To be verified with browser screenshot</verify>
  <done>
    - [ ] Visibility controls correctly filter posts in listing.
    - [ ] Private posts are only accessible by the author.
  </done>
</task>

## Success Criteria

- [ ] Users can create and preview Markdown posts.
- [ ] Posts have visibility settings that are respected by the UI.
- [ ] Homepage displays a list of the latest public posts.
