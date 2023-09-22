---
title: '[Linux] is not in the sudoers file. This incident will be reported 対処法'
date: '2023/09/22'
tags: ['Linux', 'AlmaLinux9', 'WSL2']
---

## 事象

- 一般ユーザーで sudo しようとしたら怒られた

```
hogehoge is not in the sudoers file. This incident will be reported
```

## 原因

- 対象の一般ユーザーが sudo できる wheel グループにいないから（WSL2 上の AlmaLinux9 ディストリビューションで、対象ユーザーに `sudo` コマンドの実行権限を付与する必要がある）

現状の wheel グループを調べる

```shell-session
$ cat /etc/group | grep wheel
wheel:x:10:
```

## 対処

- wheel グループに対象の一般ユーザーを追加する（AlmaLinux 9 ディストリビューション内でルートユーザーとして実行する）

```shell-session
$ wsl -d AlmaLinux9 -u root
# sudo usermod -aG wheel hogehoge
# exit
```

ユーザーが追加されているか確認

```shell-session
$ cat /etc/group | grep wheel
wheel:x:10:hogehoge
```
