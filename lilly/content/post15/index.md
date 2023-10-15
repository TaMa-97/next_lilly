---
title: 'Dockerコンテナ内でAstroのホットリロードが効かない'
date: '2023/10/15'
tags: ['Astro', 'Docker', 'WSL2', 'Vite']
---

## 事象

Docker で Astro の環境構築していた際に、Docker コンテナ内にて `npm run dev` で開発サーバ立ち上げてもホットリロードが効かない問題が発生

## 原因

調べた結果下記あたりが考えられそう

- Docker Desktop for Windows or Mac を使用している場合、ホストマシンとコンテナ間や Windows と WSL2 間でファイルシステムの通知が正しく伝達されないことがある。これによって、ファイルが変更されたときにホットリロードがトリガーされない原因となっているかもしれない。
- WSL2 上で Vite を実行する場合

> **Windows Subsystem for Linux (WSL) 2 上での Vite の実行**
> Vite を WSL2 で実行している際、ファイルシステム監視はファイルが Windows アプリケーション（WSL2 でないプロセス）により編集された場合に動作しません。これは WSL2 の制約 によるものです。これは WSL2 バックエンドの Docker で実行している場合でも該当します。
>
> これを修正するためには、次のいずれかを行えます:
>
> - 推奨: ファイルを編集するのに WSL2 アプリケーションを使用します。
>   - プロジェクトフォルダを Windows ファイルシステムの外へ移動させることも推奨されます。WSL2 から Windows ファイルシステムへアクセスするのは遅いです。このオーバーヘッドを取り除 くことでパフォーマンスが向上します。
> - `{ usePolling: true }` を設定する。

[server.watch | サーバオプション | Vite](https://ja.vitejs.dev/config/server-options.html#server-watch)

## 対処

- `astro.config.mjs` に `usePolling:true` を追加する

```js:astro.config.mjs
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  site: "https://hogehoge.dev",
  base: "/",
  server: {
    host: true,
    hmr: { clientPort: 3001 },
    port: 3001,
    watch: { usePolling: true } // 追加
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/global" as *;`,
        },
      },
    },
  },
  integrations: [astroImageTools, sitemap(), robotsTxt(), prefetch()],
});
```

- ソースコード配置の見直し
  Windows 側に配置してあったソースコードを、WSL2 ディストリビューション領域内に配置変更（Windows と Linux 間でのファイルシステム変換処理を避ける）

## 参考

- [Astro does not refresh with Docker #4003](https://github.com/withastro/docs/issues/4003)
- [サーバオプション | Vite](https://ja.vitejs.dev/config/server-options.html)
