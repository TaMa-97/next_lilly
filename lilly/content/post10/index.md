---
title: '[capo.js] head内の要素を優先度の高い順に並び替える'
date: '2023/09/15'
tags: ['パフォーマンス', 'Core Web Vitals', 'capo.js', 'meta']
---

## 前提

head 内の順序はパフォーマンスに影響を与える可能性がある

## **capo.js とは**

<head>内の各要素を最適に並び替えてくれるツール

### 推奨している順序

1. (最も優先度が低い)：その他すべて

2. スクリプト(`defer` )

   - プリフェッチとプリレンダリング
   - `<link rel=prefetch>`など

3. スクリプト(`defer` )

   - `<script defer src>`

4. プリロード

   - `<link rel=preload>`
   - `<link rel=modulepreload>`

5. 同期スタイル

   - `<link rel=stylesheet>`
   - `<style>`

6. 同期スタイル

   - `<link rel=stylesheet>`
   - `<style>`

7. 同期スクリプト

   - `<script src>`

8. スタイルのインポート

   - `@import`

9. 非同期スクリプト(`async`)

   - `<script async src>`

10. 事前接続

    - `<link rel=preconnect>`

11. タイトル

    - `<title>`

12. (最も優先度が高い)：プラグマディレクティブ

    - `<meta charset>`など

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
