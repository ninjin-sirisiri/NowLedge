フレームワーク：SolidStart（SSR必須）
実行基盤：Cloudflare **Pages**（MVP推奨）
DB：Neon Postgres
DB接続：Hyperdrive + Neon serverless driver
検索：Neon `pg_search`（ParadeDB
ランキング：SQLで合成（BM25×鮮度×ペナルティ）
認証：BetterAuth
ストレージ：R2
画像最適化：MVPはなし → 後で導入
