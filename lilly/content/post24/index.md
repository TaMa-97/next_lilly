---
title: 'ページ表示速度チューニング対応'
date: '2023/11/25'
tags: ['パフォーマンス', 'Core Web Vitals']
---

## 計測/調査方法

- Lighthouse
- [webpack-bundle-analyzer](<[リンクのURL](https://github.com/webpack-contrib/webpack-bundle-analyzer)>)
  - node_modules の最適化及び webpack によりバンドルしたファイルに含まれる各パッケージの容量を可視化してくれるツール（不要なパッケージを特定して削除できないか調査）

```json:package.json
"webpack-bundle-analyzer": "^4.9.1",
```

```javascript:webpack.config.js
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
	//省略
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

- [cost-of-modules](https://github.com/siddharthkp/cost-of-modules)
  - モジュールサイズを調査するツール
- [npm-check](https://github.com/dylang/npm-check)
  - 未使用のパッケージの調査やアップデートが必要か確認ができるツール
- [WebPageTest](<[リンクのURL](https://www.webpagetest.org/)>)
  - 表示速度を測定するためのサービス
    - 計測結果の URL が共有できる
    - API を使って計測結果を取得できる

## Core Web Vitals is 何

Core Web Vitals は、Google が提案したウェブサイトのページパフォーマンスとユーザー体験を測定するための重要な指標群

### Lighthouse の指標

- **First Contentful Paint (FCP)**

> ページの読み込みが開始されてからページ内のコンテンツのいずれかの部分が画面上にレンダリングされるまでの時間を測定している。

[First Contentful Paint（FCP）| Articles | web.dev](https://web.dev/fcp/)

- **Largest Contentful Paint (LCP)**

> ページのコンテンツの読み込み完了タイミングの測定、ビューポート内に表示される最も大きい画像またはテキスト ブロックのレンダリング時間を、ページの初期読み込み開始タイミングと比較して計測している。

[Largest Contentful Paint（LCP）| Articles | web.dev](https://web.dev/articles/lcp?hl=ja#largest-contentful-paint-defined)

- **Total Blocking Time（TBT）**

> マウスのクリック、画面のタップ、キーボードの押下などのユーザー入力に対するページの応答がブロックされている合計時間を測定している。

[Total Blocking Time | Lighthouse | Chrome for Developers](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/?utm_source=lighthouse&utm_medium=devtools)

- **Cumulative Layout Shift (CLS)**

> ページの表示中に発生した予期しないレイアウトシフトごとにレイアウトシフトスコアの最大バーストを測定している（ビューポート内の視覚要素がどのくらい移動しているか）

[Cumulative Layout Shift（CLS）| Articles | web.dev](https://web.dev/cls/?utm_source=lighthouse&utm_medium=devtools)

- **Speed Index**

> ページの読み込み中にコンテンツが視覚的に表示される速度（ページのコンテンツが取り込まれて表示される速さ）を測定している。

[速度インデックス | Lighthouse | Chrome for Developers](https://developer.chrome.com/docs/lighthouse/performance/speed-index/)

## 対応内容

Core Web Vitals の指標をもとに課題を作成

- 不要な HTML を削除する
- 不要な CSS を削除する
- 不要な JavaScript を削除する
- 静的なアセットと効率的なキャッシュポリシーの配信
  - キャッシュの有効期間を設定する
- img/iframe/link タグのブラウザ読み込みの優先度を改善する
- JavaScript ペイロードのサイズを抑える
- 不用意に含まれているライブラリは削除
- 重複パッケージのチェック追加
- Event.preventDefault を使わない場合は passive: true を指定する
- バックフォーワードキャッシュを有効化
- head 内タグを優先度の高い順に並び替える
- 軽量なライブラリがある場合は置き換える
- バンドルサイズの削減
  - TreeShaking/mangleExports の活用
- 画像最適化
  - webp 対応
- 画像の遅延読み込み
  - loading='lazy’を適宜追加
- メインスレッド処理の最小化
  - Partytown の導入
  - サードパーティースクリプト（アナリティクス関連）の処理は、メインスレッドとは別のスレッド（サービスワーカー）で処理する

## 目標スコア

- **First Contentful Paint (FCP)**
  - **1.8 秒**以下
- **Largest Contentful Paint (LCP)**
  - **2.5 秒**以下
- **Total Blocking Time（TBT）**
  - **200 ミリ秒**以下
- **Cumulative Layout Shift (CLS)**
  - **0.1**以下
- **Speed Index**
  - **3.4 秒**以下

## 作業前計測

- **Lighthouse**

  - モード(デフォルト)、デバイス(モバイル)：59 点
  - モード(デフォルト)、デバイス(デスクトップ)：88 点

![](/images/note/post24/img01_bf_sp.png)
_モバイル_
![](/images/note/post24/img01_bf_pc.png)
_デスクトップ_

- **First Contentful Paint (FCP)**
  - モード(デフォルト)、デバイス(モバイル)：1.1 秒
  - モード(デフォルト)、デバイス(デスクトップ)：0.3 秒
- **Largest Contentful Paint (LCP)**
  - モード(デフォルト)、デバイス(モバイル)：4.0 秒
  - モード(デフォルト)、デバイス(デスクトップ)：0.4 秒
- **Total Blocking Time（TBT）**
  - モード(デフォルト)、デバイス(モバイル)：2,060 ミリ秒
  - モード(デフォルト)、デバイス(デスクトップ)：290 ミリ秒
- **Cumulative Layout Shift (CLS)**
  - モード(デフォルト)、デバイス(モバイル)：0
  - モード(デフォルト)、デバイス(デスクトップ)：0
- **Speed Index**
  - モード(デフォルト)、デバイス(モバイル)：2.0 秒
  - モード(デフォルト)、デバイス(デスクトップ)：0.7 秒

![](/images/note/post24/img02_bf_sp.png)
_モバイル_
![](/images/note/post24/img02_bf_pc.png)
_デスクトップ_

## 作業後結果

- **Lighthouse**

  - モード(デフォルト)、デバイス(モバイル)：59→**73** 点
  - モード(デフォルト)、デバイス(デスクトップ)：88→**92** 点

![](/images/note/post24/img01_af_sp.png)
_モバイル_
![](/images/note/post24/img01_af_pc.png)
_デスクトップ_

- **First Contentful Paint (FCP)**
  - モード(デフォルト)、デバイス(モバイル)：1.1→1.2 秒
  - モード(デフォルト)、デバイス(デスクトップ)：0.3→0.3 秒
- **Largest Contentful Paint (LCP)**
  - モード(デフォルト)、デバイス(モバイル)：4.0→**1.6 秒**
  - モード(デフォルト)、デバイス(デスクトップ)：0.4→0.4 秒
- **Total Blocking Time（TBT）**
  - モード(デフォルト)、デバイス(モバイル)：2,060→**1,760 ミリ秒**
  - モード(デフォルト)、デバイス(デスクトップ)：290→**230 ミリ秒**
- **Cumulative Layout Shift (CLS)**
  - モード(デフォルト)、デバイス(モバイル)：0→0
  - モード(デフォルト)、デバイス(デスクトップ)：0→0
- **Speed Index**
  - モード(デフォルト)、デバイス(モバイル)：2.0→**1.9 秒**
  - モード(デフォルト)、デバイス(デスクトップ)：0.7→**0.6 秒**

![](/images/note/post24/img02_af_sp.png)
_モバイル_
![](/images/note/post24/img02_af_pc.png)
_デスクトップ_

モバイルの LCP がかなり改善したこともあり全体的なパフォーマンススコア SP**14** 点 PC**4** 点アップ、TBT 以外は目標達成
