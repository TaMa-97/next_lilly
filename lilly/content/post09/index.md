---
title: '[webpack] バンドルサイズの削減'
date: '2023/09/15'
tags: ['パフォーマンス', 'Core Web Vitals', 'webpack', 'Tree Shaking']
---

## 改善内容

### webpack 設定項目

`optimization`オプション

- `providedExports`
  モジュールによってどのエクスポートが提供されているかを、後述する **Tree Shaking** における情報源として提供する。
  - Webpack4 以降では、デフォルトで true のため不要、今回は設定の意図を明確にするために一応追加しておく。
- `usedExports`
  使用されているエクスポートのみをバンドルに含めて、使用されていないコードを取り除く（**Tree Shaking**）
  - Webpack4 以降では、モードが `production` の場合、デフォルトで true
- `mangleExports`
  エクスポートの名前を短くマングルする（`"deterministic"`）。
  再ビルド時には同じ名前が使用される（エクスポートを追加や削除しても変更されない）のでキャッシュをより効果的に使うことができる。

```js:webpack.config.js
optimization: {
  providedExports: true,
  usedExports: true,
  mangleExports: "deterministic",
},
```
