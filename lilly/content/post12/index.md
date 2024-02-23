---
title: 'Google CalendarとFull CalendarのAPI連携周り'
date: '2023/09/23'
tags: ['Google Calendar', 'Full Calendar', 'JavaScript']
---

Google Calendar と Full Calendar を連携させるにあたり必要な情報など

## 使用プラグイン

- [FullCalendar Standard（無料プラン）](https://fullcalendar.io/)
  [MIT ライセンス](https://fullcalendar.io/license)

## 連携すればできること

- CSS でデザイン調整ができる（土日祝日に色をつけたいなど）

## 連携しなくてもデフォルトでカスタマイズできること

- カレンダーのタイトル
- 表示
- タイトル
- ナビゲーション ボタン
- 日付
- 印刷アイコン
- タブ
- カレンダー リスト
- タイムゾーン
- 表示サイズ
- 背景色
- 枠線
- デフォルトビュー
- 週の開始日
- 言語

## 要準備

- Google Calendar API キー
- Google Calendar ID

## Google Calendar API キー について

- 取得
  - 支払い設定をしないと表示されないので、お客様で取得いただく。
- 認証設定
  - 制限なしにすると全て使えますが、だれでも使えてしまうので制限する。
- アプリケーションの制限
  - HTTP リファラーで本番・開発のドメインを設定する。
- API の制限
  - キーを制限で Calendar JavaScript API を選択する。

## Google Calendar API 料金

> Google Calendar API はすべて、追加料金なしで利用できます。クォータ リクエストの制限を超えても追加料金は発生せず、アカウントには請求されません。

[割り当ての管理 | Google Calendar | Google for Developers](https://developers.google.com/calendar/api/guides/quota?hl=ja)
