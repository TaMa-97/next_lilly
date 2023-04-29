---
title: 'Next.jsでframer-motionを使ったらCSS modulesのバグが発生した😓'
date: '2023/04/23'
tags: ['Next.js', 'framer-motion', 'TypeScript', 'CSS modules']
---

## 現象

Next.js で framer-motion を使いページ遷移アニメーションを実装しようとしたところ、リンクをクリックした直後にスタイルが削除される。
dev モードでは発生せず、ビルド後に発見。

```tsx:index.tsx
import { motion } from 'framer-motion'
//省略
const Home: NextPage = () => {
  const pageTitle = ''
  const pageDescription = ''
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut' }}
        className="modWrapper"
      >
        <CustomHead title={pageTitle} description={pageDescription} />
        <Header />
        <main>
          <About />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default Home
```

```tsx:_app.tsx
import { AnimatePresence } from 'framer-motion'
//省略
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence
      initial={false}
      mode={'wait'}
      onExitComplete={() => {
        window.scrollTo(0, 0)
      }}
    >
      <Component key={router.asPath} {...pageProps} />
    </AnimatePresence>
  )
}
```

## 対策

CSS modules の本番ビルドでは、next/link DOM をクリックした直後にスタイルがなくなるバグが存在する模様。
CSS modules を辞めれば解決するが今回は使用したいので却下。
以下よりページ遷移時に CSS modules のスタイルが一瞬なくなる問題に対処するための解決方法。

1. サーバーレンダリングのスタイルシート削除を防ぐカスタムフックを作成する

```tsx:useNextCssRemovalPrevention.tsx
import { useEffect } from 'react'

export const useNextCssRemovalPrevention = () => {
  useEffect(() => {
    document.querySelectorAll('head > link[data-n-p]').forEach((linkNode) => {
      linkNode.removeAttribute('data-n-p')
    })

    const mutationHandler = (mutations: MutationRecord[]) => {
      mutations.forEach(({ target, addedNodes }: MutationRecord) => {
        if (target.nodeName === 'HEAD') {
          addedNodes.forEach((node) => {
            const el = node as Element
            if (el.nodeName === 'STYLE' && el.hasAttribute('data-n-href')) {
              const href = el.getAttribute('data-n-href')
              if (href) {
                el.setAttribute('data-n-href-perm', href)
                el.removeAttribute('data-n-href')
                el.removeAttribute('media')
              }
            }
          })
          const styleNodes = document.querySelectorAll(
            'head > style[data-n-href-perm]'
          )
          const requiredHrefs = new Set<string>()
          for (let i = styleNodes.length - 1; i >= 0; i--) {
            const el = styleNodes[i]
            if (requiredHrefs.size < 2) {
              const href = el.getAttribute('data-n-href-perm')
              if (href) {
                if (requiredHrefs.has(href)) {
                  el.parentNode?.removeChild(el)
                } else {
                  requiredHrefs.add(href)
                }
              }
            } else {
              el.parentNode?.removeChild(el)
            }
          }
        }
      })
    }
    const observer = new MutationObserver(mutationHandler)
    observer.observe(document.head, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])
}
```

2. すべてのページに適用する

```tsx:_app.tsx
import { AnimatePresence } from 'framer-motion'
import { useNextCssRemovalPrevention } from '@/hooks/useNextCssRemovalPrevention' //追加
//省略
export default function App({ Component, pageProps, router }: AppProps) {
  useNextCssRemovalPrevention() //追加
  return (
    <AnimatePresence
      initial={false}
      mode={'wait'}
      onExitComplete={() => {
        window.scrollTo(0, 0)
      }}
    >
      <Component key={router.asPath} {...pageProps} />
    </AnimatePresence>
  )
}
```

## 参考

- [next.js-issues#17464](https://github.com/vercel/next.js/issues/17464)
- [next.js-issues#17464-comment](https://github.com/vercel/next.js/issues/17464#issuecomment-1447335147)
