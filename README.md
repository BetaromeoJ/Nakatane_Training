# 研修会LPテンプレート 使い方メモ

GEG Hiroshima(https://geg-hiroshima-city.vercel.app/)の構造を参考に再現した、研修会・ワークショップ向けランディングページのテンプレートです。次回別の研修会で使うときのための覚え書きです。

## ファイル構成

```
index.html          トップページ
section1.html        各講座の詳細ページ(1講座目)
section2.html        各講座の詳細ページ(2講座目)
section3.html        各講座の詳細ページ(3講座目)
section4.html        各講座の詳細ページ(4講座目)
assets/
  tailwind.css        ビルド済みのTailwind CSS(CDN不使用・静的ファイル)
  common.css          サイト独自のスタイル(スプラッシュ演出・ホバー/タップ効果など)
  common.js           スプラッシュ演出・ドロワーメニュー・ボタン効果のスクリプト
images/
  profile-canvassador.png / avatar-illustration.png  講師の写真・イラスト
  book-cover.png       著作の書影
  google-trainer-badge.png  資格バッジ画像
```

すべて静的ファイルなので、そのままGitHub Pagesなど任意のホスティングに置くだけで動きます。

## ページ構成と役割

1. **Hero(トップの見出し)** — キャッチコピー(英語2行)+ 日本語のサブコピー + CTAボタン
2. **Concept(研修の流れ)** — 4つのステップをカードで並べたセクション
3. **Agenda(Workshop Flow)** — 各講座への導線となるカードリスト。それぞれ `section1.html` 等にリンク
4. **Instructor(講師紹介)** — 写真・資格バッジ・経歴・信条
5. **Book(著作)** — 書影・書誌情報・購入リンク
6. **Resources(使うツール)** — 外部ツールへのリンクカード
7. **Footer** — 1行のコピーライトのみ
8. **ドロワーメニュー** — 右上のハンバーガーボタンから開く、全ページ共通のナビゲーション

各 `sectionN.html` は「ねらい」→「主な内容」→「やってみよう!」の3ブロック構成です。

## 次回使うときに差し替える場所

- **バッジ・タイトル文言**: `index.html` 冒頭の `中種子町情報教育部会研修会` やHeroの見出し
- **講座数・内容**: Agendaのカードと `sectionN.html` を、講座数に合わせて増減
- **講師情報**: `#instructor` セクションの写真・バッジ・経歴文
- **著作情報**: `#book` セクションの書影・書誌情報
- **画像**: `images/` フォルダの中身を差し替え、`index.html` 内の `src="images/..."` も合わせて変更
- **配色・フォント**: `assets/common.css` 冒頭(`body` の背景グラデーション、`--` を使っていないのでTailwindの `text-blue-600` 等のクラス名を置換)

## 実装している演出

- **スプラッシュ演出**: ページを開くたびに黒背景+白文字がフェードインし、少し保持したのち画面外へスライドして消える。`common.css` の `.splash-overlay` と `common.js` のタイミング(`setTimeout` の数値)で調整可能
- **ボタン・カードの浮き上がり効果**: ホバーで軽く浮き、クリック/タップでさらに大きく浮いて戻る。`common.css` の `.btn-tap` `.card-hover` `.flow-item` を参照

## Tailwind CSSの再ビルド方法

このテンプレートはCDN版Tailwindではなく、実際に使っているクラスだけを事前ビルドした `assets/tailwind.css` を使っています。HTMLの中身(クラス名)を大きく変えた場合は、以下の手順で再ビルドしてください。

```bash
mkdir tw-build && cd tw-build
npm init -y
npm install -D tailwindcss@3
npx tailwindcss init
# tailwind.config.js の content に ["../*.html"] を指定
# input.css に @tailwind base; @tailwind components; @tailwind utilities; を記述
npx tailwindcss -i input.css -o ../assets/tailwind.css --minify
```

## GitHub Pagesで公開する場合の注意

- `index.html` `sectionN.html` だけでなく、`assets/` フォルダと `images/` フォルダも必ずアップロードしてください(忘れると装飾なし・画像なしで表示されます)。
- フォルダごとGitHubの「Add file → Upload files」にドラッグ&ドロップすれば、階層構造を保ったままアップロードできます。
