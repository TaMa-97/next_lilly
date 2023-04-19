---
title: 'ウェブサイトをNext.js + TypeScriptでリニューアルしました🔥'
date: '2023/04/16'
tags: ['Next.js', 'TypeScript']
---

## はじめに

いまご覧になっているウェブサイトは、2023 年 4 月上旬に Nuxt2 から Next.js にリニューアルしました。

新ウェブサイトをつくるにあたって利用した技術を紹介します。

## 技術一覧

- Next.js v13
- TypeScript
- ESlint
- Prettier
- css modules
- Vercel
- figma

## figma でデザイン制作

デザインはシンプル且つわかりやすいように、必要のないものは無駄に追加しないようにしました。コーディングの工数削減のため、コンポーネントとして使い回しやすいように心掛けました。
フォントは和文を NotoSanJP、欧文は Roboto です。

![](/images/blog/about/img01.png)
_アートボード_

## Next.js で開発

フロントエンドのライブラリは Next.js を採用しています。
以前のサイトは、NuxtContent を用いて markdown ファイルを管理しており、Next.js でも同様に markdown ファイルで管理し、ビルド時に静的コンテンツを生成して Vercel でホスティングしています。

![](/images/blog/about/img02.png)
_PageSpeed Insights_

## スタイリング

従来の SCSS に慣れていたため、今回は CSS Modules を採用しています。
懸念点として、CSS Modules が将来的に廃止もしくは非推奨になる可能性があります。

## Markdown ツール

Zenn の UI が好きなので、Markdown パーザーとして下記を採用しています。

- [zenn-markdown-html](https://www.npmjs.com/package/zenn-markdown-html)
  - zenn-markdown-html は、Zenn 独自の記法を含む markdown を HTML に変換するためのパッケージです。
- [zenn-markdown-css](https://www.npmjs.com/package/zenn-content-css)
  - zenn-markdown-html で markdown から変換された HTML に適用するための CSS です。

参考：[Zenn の Markdown 記法一覧](https://zenn.dev/zenn/articles/markdown-guide)

## 今後追加していきたい機能

- カテゴリーページ作成
- 目次追加【✔】
- 記事検索・絞り込み機能（Algolia を使う予定）
- PWA 対応

※その他随時更新

## さいごに

こちらのサイトでは主に技術的なメモや Tips をゆるく投稿していきたいと思います。
基本的には自分に役に立つ情報をまとめていくので、内容が偏ると思います。
プライベートや仕事を通して得られた知見をまとめることで、知識の定着と誰かの役に立てれば嬉しいなと思っています。

:::message alert
このサイトの情報は無保証です。
情報を利用したことによるトラブル等が発生した場合の責任は負いません。
:::
