---
title: '[Git] (Non-Fast-Forward Merge) git merge 時に「Please enter a commit message to explain why this merge is necessary …」'
date: '2023/10/25'
tags: ['Git']
---

## ログ

自分が作業中の feature/hogehoge ブランチに push した際に、他の方が同じブランチに push しており reject され下記エラー（自分のリポジトリが後ろにいる状態）

```shell-session
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: ‘git pull …’) before pushing again.
hint: See the ‘Note about fast-forwards’ in ‘git push –help’ for details.
```

リモートリポジトリから取得しようとするが、またもやエラー

```shell-session
git pull origin feature/hogehoge
```

```shell-session
Diverging branches can't be fast-forwarded, you need to either;
git merge --no-ff
or
geit rebase
Disable this message with "git config advice.diverging false"
```

自分のローカルブランチとリモートブランチが分岐している状態で、ローカルとリモートの両方で新しいコミットが存在するため、これらが直線的（`fast-forward`）に統合できない状態にある。

なので、`-no-ff`オプションを付与して強制的に`Non-Fast-Forward Merge`を行う。
（`Non-Fast-Forward Merge`は、ブランチの統合点を明確に示したい場合や、特定のブランチの存在を履歴に残したい場合に有用）

```shell-session
git merge --no-ff origin/feature/hogehoge
```

するとまたもや何か言われる

```shell-session
# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
~
```

マージするならコミットメッセージを入力してね、とのこと

「vi」エディタが起動しているので、コマンドで対応する。
以下順序で対処（※コミットメッセージを残さない場合）

1. esc ボタンを押す

2. 「:wq」と入力する

3. Enter ボタンを押す
