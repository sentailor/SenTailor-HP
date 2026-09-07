# HP作成×映像編集 — サイト

元テレビ番組スタッフ・現法人営業による、小規模店舗向けのホームページ制作＋映像・写真の紹介サイト。

- `index.html` … サイト本体（単一ファイル・フレームワークなし）
- `images/` … 制作例のスクリーンショット（すべて架空のサンプル）

## 公開（GitHub Pages ＋ ムームードメイン）
1. このフォルダを push
2. リポジトリ Settings → Pages → Deploy from a branch → `main` / `(root)` → Save
3. 1〜2分で `https://<ユーザー名>.github.io/<リポジトリ名>/` に公開

## 変更のしかた
- 屋号：`index.html` 下部の `<script>` 内 `var BRAND = 'HP作成×映像編集';` の1行
- お問い合わせ先：同じく `var FORM_URL`（Googleフォームの回答URL）
- 制作例の画像：`images/` の4枚を差し替え
