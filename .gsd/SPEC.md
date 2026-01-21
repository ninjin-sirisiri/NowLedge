# SPEC.md - NowLedge

**Status**: FINALIZED
**Version**: 1.0.0
**Project**: NowLedge

## 1. Project Overview

NowLedge is a freshness-first technical knowledge platform. It focuses on providing up-to-date and working information by combining relevance and freshness in its search ranking, supported by author verification and community feedback.

## 2. Core Goals

1. **Freshness Ranking**: Prioritize newer and verified posts.
2. **Community Trust**: Allow users to mark posts as "stale" and provide community notes.
3. **Markdown Posting**: Support simple yet powerful Markdown editing with version history.

## 3. High-Level Requirements (from REQUIREMENTS.md)

- **REQ-AUTH-01**: GitHub and Google OAuth Login support.
- **REQ-POST-01**: Markdown Editor with Preview.
- **REQ-POST-02**: Public/Unlisted/Private visibility for posts.
- **REQ-POST-03**: Post versioning and history tracking.
- **REQ-RANK-01**: Freshness-based ranking model for search and discovery.
- **REQ-RANK-02**: Stale voting system with UI badges.
- **REQ-RANK-03**: Author identity verification.

## 4. Authentication (Target of this task)

- **Providers**: Google, GitHub.
- **Library**: `better-auth`.
- **Backend Implementation**: Completed (Phase 1).
- **Frontend UI**:
  - [x] Google Login Button (Implemented)
  - [x] GitHub Login Button (Implemented)

## 5. Success Criteria

- Users can log in using their GitHub account.
- Redirect flow works correctly and users are authenticated in the session.
- UI displays both Google and GitHub login options when not authenticated.
