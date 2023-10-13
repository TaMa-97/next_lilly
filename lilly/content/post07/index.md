---
title: '[Nextra] MDX記法'
date: '2023/08/13'
tags: ['Nextra', 'Next.js', 'MDX']
---

## JSX

### インライン JSX

```jsx
<div style={{ padding: '50px', color: 'red' }}>
  <h2>HogeHoge</h2>
</div>
```

### React コンポーネント

```jsx
import { useState } from 'react'

{
  /* Import CSS modules */
}
import styles from '../../components/hoge.module.css'

export const Hoge = () => {
  const [hoge, setHoge] = useState(0)
  return (
    <div>
      <button onClick={() => setHoge(hoge + 1)} className={styles.hoge}>
        クリック数： {hoge} 回
      </button>
    </div>
  )
}
```

```jsx
import MyHoge from '../../components/hoge'
;<MyHoge />
```

## 通常のマークダウン

```
# h1
## h2
### h3...
```

## マークダウン([GFM](https://github.github.com/gfm/))

### オートリンク

```
https://hogehoge.com
```

### テーブル

```
| a   | b   |   c |  d  |
| --- | :-- | --: | :-: |
| aa  | bb  |  cc | dd  |
```

### タスクリスト

```
- [ ] to do
- [x] done
```

## シンタックスハイライト([shiki](https://shiki.matsu.io/))

````
```js filename="hoge.js"
let hoge = 1
console.log(hoge)
````

### 強調:行

````
```js {1-2}
let hoge = 1
console.log(hoge)
````

### 強調:文字列

````
```js /hoge/
let hoge = 1
console.log(hoge)
````

### コピー

````
```js copy
let hoge = 1
console.log(hoge)
````

## 組み込みコンポーネント

### コールアウト

```jsx
import { Callout } from "nextra/components";

<Callout emoji="💡">Default</Callout>

<Callout type="info" emoji="ℹ️">
  info
</Callout>

<Callout type="warning" emoji="⚠️">
  warning
</Callout>

<Callout type="error" emoji="️🚫">
  error
</Callout>
```

### タブ

```jsx
import { Tabs, Tab } from "nextra/components";

<Tabs items={["タブ 01", "タブ 02", "タブ 03"]}>
  <Tab>**タブ 01**: タブ 01 コンテンツ</Tab>
  <Tab>**タブ 02**: タブ 02 コンテンツ</Tab>
  <Tab>**タブ 03**: タブ 03 コンテンツ</Tab>
</Tabs>

<Tabs items={["タブ 01", "タブ 02", "タブ 03"]} defaultIndex="1">
  <Tab>**タブ 01**: タブ 01 コンテンツ</Tab>
  <Tab>**タブ 02**: タブ 02 コンテンツ</Tab>
  <Tab>**タブ 03**: タブ 03 コンテンツ</Tab>
</Tabs>
```

### カード

```jsx
import { Cards, Card } from 'nextra/components'
;<Cards>
  <Card title="カード01" href="#" />
  <Card title="カード02" href="#" />
  <Card title="カード03" href="#" />
</Cards>
```

### ステップ

```jsx
import { Steps } from 'nextra/components'
;<Steps>### Step 1 Step 1 コンテンツ ### Step 2 Step 2 コンテンツ</Steps>
```

### ファイルツリー

```jsx
import { FileTree } from 'nextra/components'
;<FileTree>
  <FileTree.Folder name="pages" defaultOpen>
    <FileTree.File name="_meta.json" />
    <FileTree.File name="index.mdx" />
    <FileTree.Folder name="hoge">
      <FileTree.File name="_meta.json" />
      <FileTree.File name="index.mdx" />
    </FileTree.Folder>
  </FileTree.Folder>
</FileTree>
```
