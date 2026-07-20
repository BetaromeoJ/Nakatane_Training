# 中種子町情報教育部会研修会サイト 運用メモ

研修当日のためのサイトから、教職員が今後も使い続けられる「教職員ICT活用ポータル」へ発展させた版です。
デザイン(配色・タイポグラフィ・余白・カード・演出)は初期版から一切変更していません。変更したのは「情報設計(IA)・導線(UX)・コンテンツ構成」だけです。

「ツールから探す」のではなく「今日やりたいことから探す」サイトを目指し、トップページに9つの目的別カードを配置。
「学ぶ(講座)」「使う(目的別ナビ)」「相談する(Gem)」「活用事例」の4本柱で全体を再構成しています。

## 実装方式について

このサイトはビルド工程を持たない**静的HTML**のままです(GitHub Pagesにそのままアップロードするだけで動作)。
ただし、ヘッダー(メニュー・ドロワー)やフッター、講座ページ下部の共通カードなど、複数ページにまたがる部品は
`assets/partials/` にHTML片として切り出し、`assets/common.js` がページ読み込み時に `fetch` して差し込む仕組みにしています。

これにより、たとえば「ドロワーメニューにリンクを1つ追加したい」「講座ページ下部のカードの文言を直したい」という場合、
**該当する部品ファイル1つを直すだけで全ページに反映されます**(以前のように全ファイルへ同じ修正を繰り返す必要はありません)。

**注意:** `fetch()` によるHTML片の読み込みは `file://` では動作しません(ブラウザのセキュリティ制限)。
手元で確認する場合は `python3 -m http.server` などローカルサーバー経由で開いてください。GitHub Pages等の実際のWebサーバー上では問題なく動作します。

## ファイル構成

```
index.html            トップページ(今日やりたいこと9カード+学ぶ/使う/相談する/活用事例+更新履歴)
learn.html             学ぶ(4講座ハブ+研修資料+研修動画への導線)
use.html               使う(目的別ナビゲーション。ツール→プロンプト→講座の導線を集約)
section1.html          第1講座: Geminiで校務改善
section2.html          第2講座: Googleフォームで校務改善
section3.html          第3講座: Gemini Notebookで教材研究・校務改革
section4.html          第4講座: Canva教育版×AI
tools.html             おすすめツール集(16ツール、評価・バッジ・活用シーン付き)
gem.html               ICTで解決!校務お困りごと相談室(Gem、相談窓口)
slido.html             みんなの質問広場(Slido、現在は準備中)
vids.html              研修動画(Vids、現在は準備中)
faq.html               FAQ(Gemini/Gemini Notebook/Canva/フォーム/ドライブ/カレンダー/Classroomの7カテゴリ)
cases.html             活用事例(4件のカード。今後カード追加のみで拡張可能)
prompts.html           プロンプト集(カテゴリ検索・お気に入り機能付き。各講座のプロンプトへのハブページ)
assets/
  tailwind.css          ビルド済みTailwind CSS(CDN不使用)
  common.css            サイト独自のスタイル(スプラッシュ・浮き上がり演出など)
  common.js             部品読み込み・スプラッシュ・ドロワー・コピー機能などの共通スクリプト
  partials/
    nav.html             ヘッダー(ハンバーガーメニュー+ドロワー)。サイト全体のリンク一覧はここに集約
    footer.html          フッター
    lecture-bottom-cards.html  各講座ページ最下部の4枚カード(Gem/Slido/ツール集/トップへ)
images/
  book-cover.png / instructor-illustration.png / google-trainer-badge.png / canvassador-badge.png
```

## ページ構成(サイトマップ)

```
トップページ(index.html)
├── 今日やりたいことは?(#today、9カード) → use.html の各アンカーへ
├── ① 学ぶ(learn.html)
│     ├── 第1〜4講座(section1〜4.html)
│     └── 研修動画(vids.html)
├── ② 使う(use.html、目的別ナビゲーション)
│     ├── プロンプト集(prompts.html)
│     └── おすすめツール集(tools.html)
├── ③ 相談する
│     ├── ICTで解決!校務お困りごと相談室(gem.html)
│     ├── みんなの質問広場(slido.html)
│     └── FAQ(faq.html)
└── ④ 活用事例(cases.html)
```

トップページの「今日やりたいことは?」9カードは use.html 内の該当セクション(id="purpose-xxx")へ直接リンクしており、
各セクションが「ツール → プロンプト → 講座」の順で必要な導線をまとめています。

## 今後の追加方法

### 新しい講座(例: 第5講座)を追加する場合
1. `section4.html` をコピーして `section5.html` を作成
2. タイトル・本文・プロンプトなどを書き換え
3. `assets/partials/nav.html` の「講座一覧」リストに1行追加
4. 前の `section4.html` の「次の講座」リンクを `section5.html` に差し替え

### 新しいツールを追加する場合
`tools.html` 内のツールカード(`.card-hover` 1ブロック)をコピーし、名称・説明・活用例・公式サイトURLを書き換えるだけです。

### FAQを追加する場合
`faq.html` の `#faq-list` セクション内にあるガイドコメントの通り、`.prompt-card` を1枚追加します(コピーボタンは不要なので `data-copy-target` は付けません)。

### 活用事例を追加する場合
`cases.html` の `#cases-list` セクション内にあるガイドコメントの通り、`.card-hover` を1枚追加します。

### Slido・研修動画のURLが決まったら
- `slido.html` 冒頭の `SLIDO_URL` 変数にURLを設定するだけで、「準備中」表示が自動的に「Slidoを開く」ボタンに切り替わります。
- `vids.html` / 各講座ページの `.video-frame` 内にあるコメントアウトされた `<iframe>` のコメントを外し、`src` を実際の動画URLに差し替えてください。

## 実装している演出(変更していません)

- スプラッシュ演出: ページを開くたびに黒背景+白文字がフェードインし、少し保持したのち画面外へスライドして消える
- ボタン・カードの浮き上がり効果: ホバーで軽く浮き、クリック/タップでさらに大きく浮いて戻る
- プロンプトのコピー機能: 外部ライブラリ不使用、コピー後2秒で表示が戻る、Clipboard API非対応環境向けのフォールバックあり
- `prefers-reduced-motion` 対応、フォーカス表示、印刷対応も維持

## Tailwind CSSの再ビルド方法

HTMLのクラス名を追加・変更した場合は、`assets/partials/` 内のHTMLも忘れずにスキャン対象に含めて再ビルドしてください。

```bash
mkdir -p tw-build/src/partials
cp *.html tw-build/src/
cp assets/partials/*.html tw-build/src/partials/
cd tw-build
npm install -D tailwindcss@3
npx tailwindcss init
# tailwind.config.js の content に ["./src/*.html", "./src/partials/*.html"] を指定
# input.css に @tailwind base; @tailwind components; @tailwind utilities; を記述
npx tailwindcss -i input.css -o ../assets/tailwind.css --minify
```

## GitHub Pagesで公開する場合の注意

- `assets/`(`partials/` を含む)と `images/` フォルダも必ずアップロードしてください。
- ページ数が増えても、URL構造(ルート直下にすべて `.html` ファイルを置く形)は変更していないため、既存のリンクやQRコードはそのまま使えます。
