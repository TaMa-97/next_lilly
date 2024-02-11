---
title: 'React Typescript環境におけるカスタムパスエイリアス設定'
date: '2024/02/11'
tags: ['React', 'Typescript', 'webpack', 'ESLint']
---

## やりたいこと

`create-react-app` で作った TypeScript 環境の React アプリで、下記のように絶対パス&エイリアスによるインポートに設定変更する
※毎度相対パスで `import` するのは手間なので

```Typescript
import Hoge from '@/hoge/hogehoge';
```

:::message
create-react-app はすでにメンテナンスモードに入っており、新機能の開発は行われていない。
:::

## 環境

```shell-session
React v18.2.0
react-scripts v5.0.1
typescript v4.9.5
eslint v8.56.0
```

## 対応内容

`create-react-app` を使用している場合、デフォルトでは webpack の `alias` 設定を直接変更することはできないっぽいので、`create-react-app` の設定をオーバーライドするためのツールである`react-app-rewired`を使用する

### react-app-rewired をインストール

```shell-session
npm install react-app-rewired --save-dev
```

### package.json の scripts コマンド更新

```json:package.json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
    // ...
  }
}
```

### プロジェクトルートに config-overrides.js ファイル作成して alias 設定を追加

```javascript:config-overrides.js
const path = require('path')

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src/'),
  }
  return config
}
```

### TypeScript の設定

- プロジェクトルートに `tsconfig.paths.json` ファイルを作成して `compilerOptions` を追加

```json:tsconfig.paths.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

`tsconfig.json` の `compilerOptions` で設定すると動かない。
`extends` の設定は TypeScript のコンパイラに対してのみ影響を及ぼし、Webpack の解決メカニズムには影響しないらしい。

- `tsconfig.json` の `extends` を設定して `tsconfig.paths.json` を参照する

```json:tsconfig.json
{
  "extends": "./tsconfig.paths.json"
  // ...
}
```

ここまでの設定で正常に動くようになった。

### ESLint の対象から config-overrides.js を外しておく

最後に `config-overrides.js` は`.eslintignore` に追加して ESLint の対象から外しておく。

```shell-session:.eslintignore
/config-overrides.js
```
