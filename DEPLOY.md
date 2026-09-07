# 公開手順（屋号が決まったら、自分で一通り）

このフォルダ（`hpandhenshu-site/`）を **GitHub Pages** で公開し、あとから
**お名前.com などで取った独自ドメイン**に付け替えるまでの手順。

- 本体：`index.html`（単一ファイル）＋ `images/`（制作例スクショ4枚）
- ブランチ：`main`
- Git：インストール済み（`git --version` で確認）
- 必要なもの：GitHub アカウント

---

## 推奨構成（安い・安全・大手・定番）

このサイトは **単一HTML＋画像だけの静的サイト**。→ **有料サーバーは不要**。
かかるのは基本 **ドメイン代（年 約1,500〜2,000円）だけ**。

| 役割 | 使うもの | 費用 | 補足 |
|---|---|---|---|
| ホスティング | **GitHub Pages** | 無料 | Microsoft傘下・定番。HTTPS自動。今回はこれで十分 |
| ドメイン | **ムームードメイン** or **お名前.com**（どちらもGMO・国内最大手） | `.com` 年 約1,500〜2,000円 | 日本語UI・日本語サポート。ムームーの方がUIがシンプル |
| （更に安く／英語OKなら） | ドメインを **Cloudflare Registrar** に移管 | `.com` 年 約1,600円・**更新も同額** | 原価販売で上乗せなし。新規取得不可＝他社で取得後に移管 |

- **迷ったら：ムームードメイン（or お名前.com）でドメイン ＋ GitHub Pages（無料）。** 日本の個人事業で最も定番の組み合わせ。
- 独自ドメインのメール（`info@example.com` 等）が欲しくなったら別途：ムームーメール 月55円 / お名前.com メール / Google Workspace 月680円〜。
- Xserver 等のレンタルサーバーは「1社にまとめたい・将来WordPressも」なら選択肢だが、年1万円超で今回はオーバースペック。

---

## STEP 0. 屋号を反映する

`index.html` を編集：

1. ページ下部の `<script>` 内、この1行を正式屋号に：
   ```js
   var BRAND = 'HP作成×映像編集';   // ← ここを書き換え
   ```
   → ヘッダー・フッター・タブ名すべてに反映される。

2. （任意）先頭の `<title>` と `<meta name="description">` の「HP作成×映像編集」も置き換えると検索・SNS表示がきれいになる。

3. お問い合わせ先を変えるなら、同じ `<script>` の
   ```js
   var FORM_URL = 'https://docs.google.com/forms/d/e/.../viewform';
   ```

4. 保存したらコミット：
   ```bash
   cd "/Users/suzawa-macbookpro/Desktop/HP制作事業/hpandhenshu-site"
   git add -A
   git commit -m "屋号を〇〇に変更"
   ```

---

## STEP 1. GitHub でリポジトリを作る

1. github.com → 右上「＋」→ **New repository**
2. Repository name：例 `hp-eizo`（半角英数・ハイフン。あとで変更可）
3. **Public** を選択（無料プランの Pages は Public 必須）
4. 「Add a README」等は**チェックしない**（空で作る）
5. **Create repository**

作成後に表示される `https://github.com/<ユーザー名>/<リポジトリ名>.git` を控える。

---

## STEP 2. push する

```bash
cd "/Users/suzawa-macbookpro/Desktop/HP制作事業/hpandhenshu-site"
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

- 初回は GitHub の認証を求められる（ブラウザ認証、または Personal Access Token）。
- やり直したいとき：`git remote remove origin` してから `git remote add` し直す。

---

## STEP 3. GitHub Pages を有効化

1. リポジトリの **Settings** → 左メニュー **Pages**
2. **Source**：`Deploy from a branch`
3. **Branch**：`main` ／ フォルダ `/ (root)` → **Save**
4. 1〜2分待つと、Pages のページ上部に公開URLが出る：
   ```
   https://<ユーザー名>.github.io/<リポジトリ名>/
   ```
5. 開いて表示を確認。画像が出ない場合は `images/` が push できているか確認。

これで **STEP 3 の URL を Instagram プロフィールや友達に送れる**。ドメインはこの後でOK。

---

## STEP 4.（屋号のドメインを取ったら）独自ドメインに付け替え

### 4-1. ドメインを取る
- 「推奨構成」参照。**ムームードメイン or お名前.com（GMO）** で `example.com` を取得が定番。
- お名前.com は初年度が安く更新料が上がる／広告メールが多い点に留意。
  更新料まで最安にしたいなら、取得後に **Cloudflare Registrar** へ移管（原価・上乗せなし）。
- 屋号に近い `.com` を優先。取れなければ `.jp`（やや高い）や `.net` も可。

### 4-2. GitHub 側にドメインを登録
- リポジトリ **Settings → Pages → Custom domain** に `example.com`（または `www.example.com`）を入力 → **Save**
- これでリポジトリ直下に `CNAME` というファイルが自動追加される。
  （手動なら、`CNAME` というファイルを作り中身に `example.com` の1行だけ書いて push でも同じ）

### 4-3. DNS を設定（ドメイン取得側の管理画面）
お名前.com の場合：**ドメイン → DNS → 「DNSレコード設定を利用する」** から追加。

**A. ルートドメイン（`example.com`）で使う場合** — 以下の A レコードを4つ追加：
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
IPv6 も対応するなら AAAA レコードを4つ：
```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```
さらに `www` を同じサイトに向けたいなら CNAME レコード：
```
ホスト名: www    値: <ユーザー名>.github.io
```

**B. `www.example.com` だけで使う場合** — CNAME レコード1つだけ：
```
ホスト名: www    値: <ユーザー名>.github.io
```

> ⚠️ IPアドレスは GitHub 側で変わることがある。実行前に必ず GitHub 公式
> 「Managing a custom domain for your GitHub Pages site」で最新値を確認する。

### 4-4. HTTPS
- DNS が反映されると、Settings → Pages に **Enforce HTTPS** のチェックが出る → オンにする。
- 反映まで最短10分〜数時間。証明書は GitHub が自動発行。

### 4-5. 確認
```bash
dig example.com +short          # 上のIPが返るか
curl -sI https://example.com | head -1   # 200 が返るか
```
ブラウザで `https://example.com` を開いて表示崩れがないか確認。

---

## 以降の更新フロー

1. `hpandhenshu-site/index.html`（や `images/`）を編集
2. コミット＆push：
   ```bash
   cd "/Users/suzawa-macbookpro/Desktop/HP制作事業/hpandhenshu-site"
   git add -A
   git commit -m "変更内容を書く"
   git push
   ```
3. 数十秒〜1分で本番URLに反映される。

---

## 困ったときチェックリスト

| 症状 | 見るところ |
|---|---|
| Pages のURLが 404 | Settings → Pages の Branch 設定／`index.html` がリポジトリ直下にあるか |
| 画像だけ出ない | `images/` が push されているか（`git ls-files` で確認）／`<img src="images/...">` のパス |
| 独自ドメインが「保護されていません」 | DNS反映待ち（時間をおく）／`Enforce HTTPS` がまだ出ていないだけ |
| ドメインにアクセスすると別サイト | お名前.com のネームサーバーが「お名前.com のDNS」になっているか（他社DNSに向いていると上の設定が効かない） |
| push で認証エラー | GitHub の Personal Access Token を作り直す／`git credential` を再設定 |

---

## 補足

- **プレビュー用の Artifact** は別物。素早い確認は Artifact、正式公開はこの GitHub 版、という使い分けでOK。
- 制作例の画像を差し替えるときは `images/` の4枚（`gym.jpg` `salon.jpg` `restaurant.jpg` `guesthouse.jpg`）を同名で上書き → commit → push。
  大きい元PNGは `Desktop/HP制作事業/自社HP_練習用/` にあり。横1100px・JPEG品質80くらいに縮小してから置くと軽い（Macなら `sips -s format jpeg -s formatOptions 80 -Z 1100 元.png --out images/名前.jpg`）。
