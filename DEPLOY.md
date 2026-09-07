# 公開手順（屋号が決まったら、自分で一通り）

**この構成で公開する：**

| 役割 | 使うもの | 費用 |
|---|---|---|
| ホスティング（ファイルの置き場所） | **GitHub Pages** | 無料 |
| ドメイン（`example.com`） | **ムームードメイン**（GMO運営・日本語） | `.com` 年 約1,500〜2,000円 |

このサイトは単一HTML＋画像だけの静的サイトなので、**有料サーバーは不要**。
かかるのはドメイン代だけ。

- 対象フォルダ：この `hpandhenshu-site/`（`index.html` ＋ `images/` 4枚）
- ブランチ：`main`
- 必要なもの：GitHub アカウント／ムームードメインのアカウント（＝ロリポップ!アカウント）
- Git はインストール済み（`git --version` で確認）

> お名前.com でも手順はほぼ同じ（画面の名称が違うだけ）。DNSの値は共通。

---

## 全体の流れ

```
STEP 0  屋号を index.html に反映（BRAND を書き換え）
STEP 1  GitHub でリポジトリを作る
STEP 2  push する
STEP 3  GitHub Pages を有効化 → 仮URLで公開（ここまでで友達・Instagramに出せる）
─────  屋号のドメインを取ったら ─────
STEP 4  ムームードメインで example.com を取得
STEP 5  GitHub 側にドメインを登録
STEP 6  ムームーDNS に レコードを追加
STEP 7  HTTPS を有効化 → https://example.com で公開
```

---

## STEP 0. 屋号を反映する

`index.html` を編集：

1. ページ下部の `<script>` 内、この1行を正式屋号に：
   ```js
   var BRAND = 'HP作成×映像編集';   // ← ここを書き換え
   ```
   → ヘッダー・フッター・タブ名すべてに反映される。
2. （任意）先頭の `<title>` と `<meta name="description">` の中の「HP作成×映像編集」も置き換えると検索・SNS表示がきれいになる。
3. お問い合わせ先を変えるなら、同じ `<script>` の
   ```js
   var FORM_URL = 'https://docs.google.com/forms/d/e/.../viewform';
   ```
4. 保存してコミット：
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
4. 「Add a README」等は **チェックしない**（空で作る）
5. **Create repository**

作成後に出る `https://github.com/<ユーザー名>/<リポジトリ名>.git` を控える。

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

## STEP 3. GitHub Pages を有効化（仮URLで公開）

1. リポジトリの **Settings** → 左メニュー **Pages**
2. **Source**：`Deploy from a branch`
3. **Branch**：`main` ／ フォルダ `/ (root)` → **Save**
4. 1〜2分待つと、Pages のページ上部に公開URLが出る：
   ```
   https://<ユーザー名>.github.io/<リポジトリ名>/
   ```
5. 開いて表示を確認。画像が出ないときは `images/` が push できているか（`git ls-files` で確認）。

**この URL を Instagram プロフィールや友達に送れる。** ドメインはこの後でOK。

---

## STEP 4. ムームードメインで example.com を取得

1. muumuu-domain.com にアクセス → 欲しい名前を検索
2. `.com` が空いていれば選択 →（`.jp` は高め、`.net` でも可）
3. アカウント作成（ロリポップ!アカウント兼用）→ 支払い（クレカ / コンビニ 等）→ 取得完了
4. **WHOIS情報公開代行**：取得時に自動で「代行する」になっているか確認（個人情報を隠す設定。無料）
5. **ネームサーバー**：ムームードメインで取ると初期状態で「**ムームーDNS**」になっている（＝この後の設定が効く）。他社DNSに変更していないこと。

---

## STEP 5. GitHub 側にドメインを登録

1. リポジトリ **Settings → Pages → Custom domain** に `example.com` を入力 → **Save**
   - `www.example.com` をメインにしたい場合はそちらを入力。
2. これでリポジトリ直下に `CNAME` ファイルが自動追加される（中身はドメイン名1行）。
   - 手動なら：`CNAME` というファイルを作り `example.com` の1行だけ書いて commit / push でも同じ。

---

## STEP 6. ムームーDNS にレコードを追加

ムームードメインの管理画面：
**コントロールパネル → ドメイン操作 → ムームーDNS → 対象ドメインの「変更」**
→ 下部「**設定2（カスタム設定）**」に、以下を1行ずつ追加。

### A. ルートドメイン（`example.com`）で使う場合

**Aレコードを4つ**（GitHub Pagesの固定IP）：

| サブドメイン | 種別 | 内容 |
|---|---|---|
| （空欄） | A | `185.199.108.153` |
| （空欄） | A | `185.199.109.153` |
| （空欄） | A | `185.199.110.153` |
| （空欄） | A | `185.199.111.153` |

`www` も同じサイトに向けるなら **CNAMEを1つ**：

| サブドメイン | 種別 | 内容 |
|---|---|---|
| `www` | CNAME | `<ユーザー名>.github.io` |

（IPv6も対応するなら AAAA レコードを4つ：`2606:50c0:8000::153` / `...8001::153` / `...8002::153` / `...8003::153`。必須ではない）

### B. `www.example.com` だけで使う場合

**CNAMEを1つだけ**：

| サブドメイン | 種別 | 内容 |
|---|---|---|
| `www` | CNAME | `<ユーザー名>.github.io` |

> ⚠️ GitHub側のIPは将来変わる可能性あり。作業前に GitHub公式ドキュメント
> 「Managing a custom domain for your GitHub Pages site」で最新値を確認。

保存 →「セットアップ情報変更」を押す。反映まで最短10分〜数時間。

---

## STEP 7. HTTPS を有効化 → 確認

1. DNSが反映されると、リポジトリ Settings → Pages に **Enforce HTTPS** のチェックが出る → **オン**にする（証明書はGitHubが自動発行）。
2. 確認：
   ```bash
   dig example.com +short                    # 上の4つのIPが返る
   curl -sI https://example.com | head -1     # HTTP/2 200
   ```
3. ブラウザで `https://example.com` を開いて表示崩れがないか確認。
4. `https://<ユーザー名>.github.io/<リポジトリ名>/` にアクセスすると、独自ドメインへ自動転送される。

以後、Instagram等のリンクは `https://example.com` に差し替え。

---

## 以降の更新フロー

1. `index.html`（や `images/`）を編集
2. push：
   ```bash
   cd "/Users/suzawa-macbookpro/Desktop/HP制作事業/hpandhenshu-site"
   git add -A
   git commit -m "変更内容"
   git push
   ```
3. 数十秒〜1分で本番URLに反映。

---

## 困ったときチェックリスト

| 症状 | 見るところ |
|---|---|
| Pages のURLが 404 | Settings → Pages の Branch 設定／`index.html` がリポジトリ直下にあるか |
| 画像だけ出ない | `images/` が push されているか（`git ls-files`）／`<img src="images/...">` のパス |
| 独自ドメインが「保護されていない通信」 | DNS反映待ち。時間をおいて `Enforce HTTPS` にチェックが出たらオン |
| ドメインにアクセスすると別のページ | ムームードメインのネームサーバーが「ムームーDNS」になっているか（他社に向いていると STEP 6 が効かない） |
| `dig` でIPが返らない | ムームーDNSのレコード保存後、「セットアップ情報変更」を押したか／さらに待つ |
| push で認証エラー | GitHub の Personal Access Token を作り直す |

---

## 補足

- **プレビュー用の Artifact** は別物。素早い確認はArtifact、正式公開はこのGitHub版、と使い分けてOK。
- 制作例の画像を差し替えるときは `images/` の4枚（`gym.jpg` `salon.jpg` `restaurant.jpg` `guesthouse.jpg`）を同名で上書き → commit → push。
  元PNGは `Desktop/HP制作事業/自社HP_練習用/` にあり。縮小コマンド（Mac標準）：
  ```bash
  sips -s format jpeg -s formatOptions 80 -Z 1100 元画像.png --out images/名前.jpg
  ```
- 独自ドメインのメール（`info@example.com` 等）が欲しくなったら「ムームーメール 月55円」を追加。
