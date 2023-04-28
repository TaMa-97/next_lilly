---
title: 'Next.js：useRouterの使い方'
date: '2023/04/28'
tags: ['Next.js', 'TypeScript']
---

## はじめに

こちらのサイトのヘッダーコンポーネントでページごとにカレント表示を実装するために`useRouter`を用いました。
そこでこの記事では、`useRouter`の機能やプロパティ/メソッドの紹介、最後に具体例を交えながら現在のページのルーティング情報を取得する方法を書いていきます。

## useRouter とは

`useRouter`は Next.js に組み込まれているフックで、現在のページのルーティング情報やルーティングに関する機能を提供しています。

## router オブジェクトのプロパティ

`useRouter`フックから返されるオブジェクトには下記のように様々な情報を持っています。

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

これらのプロパティを活用すれば、現在のページのルーティング情報を取得したり、ページ遷移の制御やクエリパラメータの操作を行ったりすることができます。

## useRouter のメソッド

`useRouter`から取得できる`router`オブジェクトには、さまざまなメソッドがあります。

- **push**
  ページ遷移を実行する。
  引数には遷移先の URL とオプションが渡される。

```tsx
const router = useRouter()
const buttonClick = () => {
  router.push('/about')
}
return <button onClick={buttonClick}>hoge</button>
```

- **replace**
  ページ遷移を実行する（※ブラウザの履歴には追加されない）
  引数には遷移先の URL とオプションが渡される。

```tsx
const router = useRouter()
const buttonClick = () => {
  router.replace('/about')
}
return <button onClick={buttonClick}>hoge</button>
```

- **back**
  ブラウザの履歴を 1 つ戻る。

```tsx
const router = useRouter()
const BackButtonClick = () => {
  router.back()
}

return <button onClick={BackButtonClick}>hoge</button>
```

- **beforePopState**
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

- **events**
  `router.events`は、ページ遷移イベントを監視する機能です。
  ページ遷移の開始や完了などのタイミングで特定の処理を行うことができます。

```tsx

```

## 具体例

具体例として、Header コンポーネントで`useRouter`を使用して、現在のページのパス名に基づいてナビリンクのスタイルを変更することができます。
以下は、`useRouter`を使用してアクティブなナビリンクのスタイルを変更するための簡単な例です。

```tsx:Header.tsx
import { useRouter } from 'next/router'
//省略
const Header = () => {
  const router = useRouter()

  const isActiveLink = (path) => {
    return router.pathname === path
  }

  return (
    <header className={styles.gHeader}>
      <div className={`container ${styles.gHeader__inner}`}>
        <nav className={styles.gNav}>
          <ul className={styles.gNav__list}>
            <li className={styles.gNav__item}>
              <Link
                href="/hoge01"
                className={`${styles.gNav__link} ${isActiveLink('/hoge01') ? styles.gNav__linkActive : ''}`}
                scroll={false}
              >
                hoge01
              </Link>
            </li>
            <li className={styles.gNav__item}>
              <Link
                href="/hoge02"
                className={`${styles.gNav__link} ${isActiveLink('/hoge02') ? styles.gNav__linkActive : ''}`}
                scroll={false}
              >
                hoge02
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
```

こちらの例では、`useRouter`フックを使って`router`オブジェクトを取得して、`isActiveLink`関数を作成しています。引数として渡されたパスが現在のページのパスと一致するかどうかをチェックしています。

## 参考

- [next/router](https://nextjs.org/docs/api-reference/next/router)
