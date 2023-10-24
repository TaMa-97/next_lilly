---
title: '[GAS] Gmailラベル付け自動振り分け'
date: '2023/10/25'
tags: ['GAS', 'JavaScript']
---

Google Apps Script (GAS)を使用して、Gmail の受信メールに特定のキーワードが含まれている場合に自動的にラベルを付与して振り分けする方法

## GAS スクリプト

以下のスクリプトは、受信メールの中から各キーワードが含まれているものを検索して、それぞれのメールに対応するラベルを付与します。

```js
function autoLabelEmails() {
  // 対象のキーワード/ラベル名を設定
  const keywordLabelPairs = [
    { keyword: 'GitHub', label: 'GitHub' },
    { keyword: 'Backlog', label: 'Backlog' },
    { keyword: 'Redmine', label: 'Redmine' },
    { keyword: 'rakumo', label: '勤怠' },
    { keyword: 'Adobe', label: 'Adobe' },
    { keyword: 'Figma', label: 'Figma' },
    { keyword: 'Chatwork', label: 'Chatwork' },
  ]

  for (let i = 0; i < keywordLabelPairs.length; i++) {
    let pair = keywordLabelPairs[i]

    // Gmailで検索するクエリを設定
    const query = 'is:inbox is:unread subject:' + pair.keyword

    // クエリに一致するスレッドを取得
    let threads = GmailApp.search(query)

    // ラベルを取得、存在しない場合は新しく作成
    let label =
      GmailApp.getUserLabelByName(pair.label) ||
      GmailApp.createLabel(pair.label)

    // 各スレッドにラベル付与
    for (let j = 0; j < threads.length; j++) {
      label.addToThread(threads[j])
    }
  }
}
```

あとは、定期的に実行したいのでトリガーを設定します。
GAS のトリガー機能を使用して設定することができます。
