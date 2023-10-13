---
title: '[Docker] services. must be a mapping 対処'
date: '2023/10/14'
tags: ['Docker', 'Docker Compose']
---

## 事象

Docker で環境構築を行っていた際にコンテナイメージをビルドしたら起きた
エラー内容は下記

```shell-session
validating /docker-compose.yml: services.app.environment must be a mapping
```

## 原因

インデントが正しくないだけ

## 対処

```docker:docker-compose.yml
version: '3.9'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hogehoge
    volumes:
      - ./app:/usr/src/app
    ports:
      - "3001:3001"
    stdin_open: true
    tty: true
    environment:
    # - API_KEY=your_api_key
```

`- API_KEY=your_api_key`箇所のインデント修正

```docker:docker-compose.yml
version: '3.9'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hogehoge
    volumes:
      - ./app:/usr/src/app
    ports:
      - "3001:3001"
    stdin_open: true
    tty: true
    # environment:
    #   - API_KEY=your_api_key
```
