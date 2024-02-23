---
title: 'React SPAで特定の要素内のスクロール位置を制御する'
date: '2024/02/21'
tags: ['React', 'Typescript']
---

## やりたいこと

React SPA 環境において `React Router` での画面遷移時に、特定の要素のスクロール位置が保持されたまま遷移するので、遷移時は最上部にリセットさせる。

## 環境

| 言語       | UI ライブラリ | スタイリング             | ルーティングライブラリ   | リンター       |
| ---------- | ------------- | ------------------------ | ------------------------ | -------------- |
| typescript | react v18.2.0 | styled-components v6.1.8 | react-router-dom v6.22.0 | eslint v8.56.0 |

## 対応内容

下記が今回対象の `Wrapper` コンポーネントの`StyledBodyInner`要素に対して、遷移時にスクロール位置を最上部にリセットする機能を付与したもの。

```tsx:src/components/layouts/wrapper/Wrapper.tsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// 省略

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
    wrapperRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
      <StyledWrapper>
        <StyledHead>
          <StyledLogo>
            <img src={logo} alt="" />
          </StyledLogo>
        </StyledHead>
        <StyledBody>
          <StyledBodyInner ref={wrapperRef}>
          {children}
          </StyledBodyInner>
        </StyledBody>
        <StyledFoot>
          <StyledBtn>
            <img src={btn01} alt="" />
          </StyledBtn>
        </StyledFoot>
      </StyledWrapper>
  );
}

export default Wrapper;
```

- `const { pathname } = useLocation();`
  - 現在の URL のパス名を取得
- `<StyledBodyInner ref={wrapperRef}>{children}</StyledBodyInner>`
  - `ref` 属性を追加して、`wrapperRef` をその要素への参照として設定する
- `const wrapperRef = useRef<HTMLDivElement>(null);`
  - 先ほど `ref` 属性を設定した対象の DOM 要素に直接アクセスする
- `useEffect(() => {...}, [pathname]);`
  - `pathname` が変更されるたび（ページ遷移が発生するたび）に実行される副作用を定義する

これで問題ないかと思いきや、実機モバイルデバイス（iPhone や Android）で確認するとスクロール位置のリセットが期待通りに動作しません。
色々解決策探りましたが、`scrollTo` での解決は難しそうでした。
別のアプローチとして、`scrollIntoView` メソッドを使用してスクロールさせることで実機モバイルデバイスでも解決できました。（なにか他にいい方法があれば知りたい）

### scrollIntoView メソッドについて

> Element インターフェイスの scrollIntoView() メソッドは、 scrollIntoView() が呼び出された要素がユーザーに見えるところまで、要素の親コンテナーをスクロールします。

[Element: scrollIntoView() メソッド - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView)
※デフォルトでは、scrollIntoView()は要素をビューポートの最上部にスクロールする。

### 実機デバイス対応

React の `useContext` フックと `scrollIntoView` メソッドを駆使して対応していきます。

```tsx:src/components/layouts/wrapper/Wrapper.tsx
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollContext from './ScrollContext'; // 追加

// 省略

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    　<ScrollContext.Provider value={wrapperRef}> {/* 追加 */}
        <StyledWrapper>
          <StyledHead>
            <StyledLogo>
              <img src={logo} alt="" />
            </StyledLogo>
          </StyledHead>
          <StyledBody>
            <StyledBodyInner ref={wrapperRef}>
            {children}
            </StyledBodyInner>
          </StyledBody>
          <StyledFoot>
            <StyledBtn>
              <img src={btn01} alt="" />
            </StyledBtn>
          </StyledFoot>
        </StyledWrapper>
    　</ScrollContext.Provider>
  );
}

export default Wrapper;
```

```tsx:src/components/layouts/wrapper/ScrollContext.tsx
import { createContext, RefObject } from 'react';

const ScrollContext = createContext<RefObject<HTMLDivElement> | null>(null);

export default ScrollContext;
```

```tsx:src/components/layouts/header/Header.tsx
import React, { useContext, useEffect } from 'react'; // useContext, useEffect追加
import { Link, useLocation } from 'react-router-dom'; // useLocation 追加
import styled from 'styled-components';
import imgHeader from '@/images/common/img_header.png';
import ScrollContext from '../wrapper/ScrollContext'; // 追加

// 省略

function Header() {

　// ------- ここから追加 -------
  const wrapperRef = useContext(ScrollContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      wrapperRef.current.scrollIntoView();
    }
  }, [pathname, wrapperRef]);
  // ------- ここまで追加 -------

  return (
      <StyledHeader>
        <Link to="/">
          <img src={imgHeader} alt="ほげほげ" />
        </Link>
      </StyledHeader>
  );
}

export default Header;
```

1. `ScrollContext.tsx` にて、`createContext` を使用して新しいコンテキストを作成する。（Wrapper コンポーネントと Header コンポーネント間で共有するため用）

2. 対象要素の`<StyledBodyInner ref={wrapperRef}>`を ScrollContext コンテキストで管理して、ScrollContext コンテキストを使用するすべてのコンポーネントからアクセスできるようにする。
   - `<ScrollContext.Provider value={wrapperRef}>`
3. Header コンポーネントで、`useContext` フックを使用して ScrollContext コンテキスト値から対象（`StyledBodyInner`）を取得する。
   - `const wrapperRef = useContext(ScrollContext);`
4. React Router の `useLocation` フックを使用して現在の URL の位置（location オブジェクト）を取得する。
   - `const { pathname } = useLocation();`
5. React の `useEffect` フックを使用して、`[pathname, wrapperRef]`に指定された値が変更されるたびに、フック内の関数をコンポーネントのレンダリング後に再実行させる。
   - `useEffect(() => {...}, [pathname, wrapperRef]);`
6. `scrollIntoView` メソッドを使用して、`StyledBodyInner` をページの最上部にスクロールする。
   - `wrapperRef.current.scrollIntoView();`
