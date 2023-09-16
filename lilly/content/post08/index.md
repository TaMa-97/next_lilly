---
title: '静的なアセットと効率的なキャッシュポリシーの配信'
date: '2023/09/14'
tags: ['パフォーマンス', 'Core Web Vitals', 'Cache-Control']
---

## PageSpeed Insights の警告内容

「静的なアセットと効率的なキャッシュポリシーの配信」

## 原因

アセット系のブラウザキャッシュ設定に問題あり

## 改善内容

.htaccess にキャッシュの有効期間を設定することで通信料を削減できるので、
Cache-Control（HTTP/1.1 から使える HTTP ヘッダー）で、キャッシュの有効期限を指定する。

下記、Apache サーバーを対象とした.htaccess の記述内容

- CSS/JS/画像系は半年（max-age=15552000）
- Web フォント系は 1 年（max-age=31536000）

```.htaccess:.htaccess
<IfModule mod_headers.c>
<FilesMatch "\.(css|js|gif|jpe?g|png|webp|svg|ico)$">
  Header set Cache-Control "public, max-age=15552000"
</FilesMatch>
<FilesMatch "\.(eot|ttf|woff|woff2)$">
  Header set Cache-Control "public, max-age=31536000"
</FilesMatch>
</IfModule>
```

こちらの設定で、PageSpeed Insights では合格した監査判定となりました。
