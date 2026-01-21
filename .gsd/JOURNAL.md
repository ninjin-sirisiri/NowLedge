# Journal - NowLedge

## 2026-01-21

- Phase 1 の基盤構築を完了。
- ユーザー報告「ログインしても名前が正しく表示されない」というバグを修正。
  - 原因: SolidJS の `<Show>` コンポーネントで関数形式の子要素を使用した場合、`keyed` プロップがないと引数がアクセサ（関数）として渡されるため、`{user.name}` が期待通りに動作していなかった。
  - 修正: `<Show>` に `keyed` プロップを追加し、引数がオブジェクトとして渡されるようにした。

## 2026-01-20: Project Initialization

- Initialized GSD project structure.
- Defined SPEC and REQUIREMENTS based on PRD.
- Performed research on Neon pg_search and Better Auth integration.
- Finalized ROADMAP with 4 phases.
