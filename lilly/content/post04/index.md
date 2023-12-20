---
title: '[Next.js] useRouter備忘録'
date: '2023/04/29'
tags: ['Next.js', 'TypeScript']
---

`useRouter`の機能やプロパティ/メソッド、現在のページのルーティング情報を取得する方法など

## useRouter とは

`useRouter`は Next.js に組み込まれているフックで、現在のページのルーティング情報やルーティングに関する機能を提供している。

## router オブジェクトのプロパティ

`useRouter`フックから返されるオブジェクトには下記のように様々な情報を持っている。

```tsx
ServerRouter {
  route: '/', //現在のページのルート名
  pathname: '/', //現在のページのパス名
  query: {}, //現在のページのクエリパラメータを表すオブジェクト
  asPath: '/', //現在のページの実際のパス
  isFallback: false, //現在のページがフォールバックページかどうかを表すブール値
  basePath: '', //アプリケーションのベースパス
  locale: undefined, //現在のページのロケール
  locales: undefined, //利用可能なロケールのリスト
  defaultLocale: undefined, //アプリケーションで設定されているデフォルトのロケール
  isReady: false, //すべてのルーティングイベントが完了したかどうか
  domainLocales: undefined, //ドメインごとのロケール情報
  isPreview: false, //現在のページがプレビューモードで表示されているかどうか
  isLocaleDomain: false //現在のページがロケールに関連するドメインで表示されているかどうか
}
```

これらのプロパティを活用すれば、現在のページのルーティング情報を取得したり、ページ遷移の制御やクエリパラメータの操作を行ったりすることができる。

## useRouter のメソッド

`useRouter`から取得できる`router`オブジェクトには、さまざまなメソッドがある。

### push

ページ遷移を実行する。
引数には遷移先の URL とオプションが渡される。

```tsx
const router = useRouter()
const buttonClick = () => {
  router.push('/hoge')
}
return <button onClick={buttonClick}>hoge</button>
```

### replace

ページ遷移を実行する（※ブラウザの履歴には追加されない）
引数には遷移先の URL とオプションが渡される。

```tsx
const router = useRouter()
const buttonClick = () => {
  router.replace('/hoge')
}
return <button onClick={buttonClick}>hoge</button>
```

### back

ブラウザの履歴を 1 つ戻る。

```tsx
const router = useRouter()
const BackButtonClick = () => {
  router.back()
}
return <button onClick={BackButtonClick}>hoge</button>
```

### beforePopState

ブラウザの履歴が変更される前に呼び出されるイベントリスナーを登録する。

```tsx
import { useEffect } from 'react'
const router = useRouter()
useEffect(() => {
  const beforeState = (url, options) => {
    // 処理
  }
  router.beforePopState(beforeState)
  return () => {
    router.beforePopState(null)
  }
}, [])
```

### events

`router.events`は、ページ遷移イベントを監視する機能。
ページ遷移の開始や完了などのタイミングで特定の処理を行うことができる。

- #### 主なメソッド

  - `on`: イベントリスナーを登録
  - `off`: イベントリスナーを解除

- #### 主なイベント

  - `routeChangeStart`: ルート変更前
  - `routeChangeComplete`: ルート変更後
  - `routeChangeError`: ルート変更時のエラー

```tsx
//----- 例
//下記ではuseEffectフックを使ってイベントリスナーを登録/解除している。ページ遷移の進行状況を監視して、特定のタイミングで処理を実行することができる。
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const MyComponent = () => {
  const router = useRouter()

  useEffect(() => {
    const RouteChangeEvent = (url) => console.log('URL変更:', url)
    router.events.on('routeChangeStart', RouteChangeEvent)

    return () => router.events.off('routeChangeStart', RouteChangeEvent)
  }, [])

  return (
    <h1>
      ページ遷移が開始されるたびにコンソールにメッセージを表示するコンポーネント
    </h1>
  )
}
```

## 参考

- [next/router](https://nextjs.org/docs/api-reference/next/router)
