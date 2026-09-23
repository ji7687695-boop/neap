# neap

近くにいる、趣味の合う知らない人の日常を見るSNS。

## MVP
- 距離 × 趣味 × 新しさの投稿フィード
- 写真 / テキスト投稿
- いいね / コメント
- setlog程度の薄いプロフィール
- Instagramへの1タップ導線
- 通報 / ブロック
- DM・マッチング・募集・性別検索なし

## Stack
Flutter + Supabase + PostgreSQL/PostGIS.

## Run
1. Flutter SDKを用意
2. Supabaseプロジェクトを作成
3. supabase/schema.sql をSQL Editorで実行
4. flutter pub get
5. flutter run --dart-define=SUPABASE_URL=YOUR_URL --dart-define=SUPABASE_ANON_KEY=YOUR_ANON_KEY

現在は触れるUIプロトタイプ＋DBスキーマまで実装。次の接続点はAuth/Storage/位置取得と実データフィード。



Preview updated: 1790156010322

Deploy latest UI