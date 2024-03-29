---
title: 'ウェブサイトをNext.js + TypeScriptでリニューアルしました'
date: '2023/04/16'
tags: ['Next.js', 'TypeScript']
---

## はじめに

いまご覧になっているウェブサイトは、2023 年 4 月上旬に Nuxt2 から Next.js にリニューアルしました。

## 使用技術など

- Next.js v13
- TypeScript
- ESlint
- Prettier
- CSS modules
- Vercel
- Figma

### Figma によるデザイン制作

Figma を用いてシンプルかつユーザビリティに優れたデザインを目標としました。
サイトに訪れた方が目的地にスムーズにたどり着けるように考慮しました。
視認性と読みやすさ向上のために、和文フォントには Noto Sans JP を、欧文フォントには Roboto を採用し、全体のデザインと相性が良く、一貫性のある印象を提供できるようにしました。

![](/images/note/about/img01.png)
_アートボード_

### フロントは Next.js

以前は NuxtContent でマークダウンファイルを管理していましたが、Next.js への移行でも引き続き md ファイルは活用しつつビルド時に静的コンテンツを生成し、Vercel でホスティングしています。
また、コード品質と保守性の向上のために ESLint と Prettier を導入しました。コードの問題を見つけやすくなり保存時に自動フォーマットが適用されるため、開発体験が向上し改善と保守作業が快適になりました。

![](/images/note/about/img02.png)
_PageSpeed Insights(リリース時のスコア)_

### CSS Modules によるスタイル管理

従来の SCSS に慣れていたため、今回は CSS Modules を採用しています。
CSS Modules は、コンポーネントごとにスタイリングしやすく、スタイルをスコープ化できて衝突を意識する必要がないので開発体験が良いです。
懸念点として、CSS Modules が将来的に廃止もしくは非推奨になる可能性があります。

### Markdown ツール

- [zenn-markdown-html](https://www.npmjs.com/package/zenn-markdown-html)
  - zenn-markdown-html は、Zenn 独自の記法を含む markdown を HTML に変換するためのパッケージです。
- [zenn-markdown-css](https://www.npmjs.com/package/zenn-content-css)
  - zenn-markdown-html で markdown から変換された HTML に適用するための CSS です。

## さいごに

当サイトでは主に技術的なメモや Tips をゆるく投稿していきたいと思います。
基本的には自分に役に立つ情報をまとめていくので、内容が偏ると思います。
プライベートや仕事を通して得られた知見をまとめることで、知識の定着と誰かの役に立てれば嬉しいなと思っています。

:::message alert
当サイトの情報は無保証です。
極力公式ドキュメントから参照するように心掛けますが、情報を利用したことによるトラブル等が発生した場合の責任は負いません。
:::
