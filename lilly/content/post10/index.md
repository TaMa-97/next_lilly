---
title: '[capo.js] head内の要素を優先度の高い順に並び替える'
date: '2023/09/15'
tags: ['パフォーマンス', 'capo.js', 'head']
---

## **capo.js**とは

<head>内の各要素を最適に並び替えてくれるツール

### 推奨している順序

1. (最も優先度が低い)：下記以外のものすべて

2. プリフェッチ/プリレンダリング類

   - `<link rel=prefetch>`
   - `<link rel=prerender>`...

3. スクリプト(`defer` )

   - `<script defer src>`

4. プリロード類

   - `<link rel=preload>`
   - `<link rel=modulepreload>`...

5. 同期スタイル

   - `<link rel=stylesheet>`
   - `<style>`

6. 同期スクリプト

   - `<script src>`

7. スタイルのインポート

   - `@import`

8. 非同期スクリプト(`async`)

   - `<script async src>`

9. 事前接続類

   - `<link rel=preconnect>`

10. タイトル

    - `<title>`

11. (最も優先度が高い)：プラグマディレクティブ

    - `<meta charset>`...

## 使い方

1. Chrome 拡張機能をインストール
   （[https://chrome.google.com/webstore/detail/capo-get-your-﹤ 𝚑𝚎𝚊𝚍 ﹥/ohabpnaccigjhkkebjofhpmebofgpbeb](https://chrome.google.com/webstore/detail/capo-get-your-%EF%B9%A4%F0%9D%9A%91%F0%9D%9A%8E%F0%9D%9A%8A%F0%9D%9A%8D%EF%B9%A5/ohabpnaccigjhkkebjofhpmebofgpbeb)）

2. 起動してコンソールのログを開く

## 調査方法

- **Capo: Actual head order**：現在の順序
- **Capo: Sorted head order**：優先度が高い順に並び替えた結果

![Capo: Actual head order](/images/note/post10/capo_before01.png)
_Capo: Actual head order_
![Capo: Sorted head order](/images/note/post10/capo_after01.png)
_Capo: Sorted head order_
上記の結果を元に手動で並び替え。
