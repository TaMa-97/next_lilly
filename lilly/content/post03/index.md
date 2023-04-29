---
title: 'Safari対応：縦書きテキスト＋横スクロールバーの実装方法👻'
date: '2023/04/27'
tags: ['JavaScript', 'SimpleBar', 'SCSS']
---

## はじめに

横スクロールバーが Safari（iOS および macOS）で表示されない問題が発生しました。
iOS 13 以前のバージョンや macOS においては、`-webkit-scrollbar` を指定することで問題が解決されていましたが、
iOS 13 以降のバージョンでは、`-webkit-scrollbar` が効かなくなり、CSS だけでのスクロールバーの常時表示ができなくなりました。
そこで今回は、SimpleBar という JavaScript プラグインを使って解決していきます。

## SimpleBar バージョン

```JavaScript:package.json
"simplebar": "^6.2.1"
```

## 解決方法

今回の実装では、テキストを縦書きで右端スタートを目標としてます。
そのため、現在地のスクロールバー（`.simplebar-scrollbar`）を左端から右端に移動させる必要があります。SimpleBar はデフォルトでコールバック関数を提供していないようなので、カスタムコールバック関数を作成します。
SimpleBar インスタンスが適用された要素に対して、`getScrollElement` メソッド（SimpleBar が提供するメソッド）を使用してスクロールイベントを関連付けて `setTimeout` で実行しました。
また、Safari ではテキストが逆方向から始まってしまう問題も発生したため、CSS ハックを用いて Safari のみに適用されるスタイルを分けて対処しました。

```html
<div class="modHoge">
  <div class="modHoge__box" data-scrollbar>
    <div class="modHoge__boxInner">
      <p class="modHoge__txt">
        テキスト5
        <br />
        テキスト5
        <br />
        テキスト5
      </p>
      <p class="modHoge__txt">
        テキスト4
        <br />
        テキスト4
        <br />
        テキスト4
      </p>
      <p class="modHoge__txt">
        テキスト3
        <br />
        テキスト3
        <br />
        テキスト3
      </p>
      <p class="modHoge__txt">
        テキスト2
        <br />
        テキスト2
        <br />
        テキスト2
      </p>
      <p class="modHoge__txt">
        テキスト1
        <br />
        テキスト1
        <br />
        テキスト1
      </p>
    </div>
    <div class="modHoge__boxInner -safari">
      <p class="modHoge__txt">
        テキスト1
        <br />
        テキスト1
        <br />
        テキスト1
      </p>
      <p class="modHoge__txt">
        テキスト2
        <br />
        テキスト2
        <br />
        テキスト2
      </p>
      <p class="modHoge__txt">
        テキスト3
        <br />
        テキスト3
        <br />
        テキスト3
      </p>
      <p class="modHoge__txt">
        テキスト4
        <br />
        テキスト4
        <br />
        テキスト4
      </p>
      <p class="modHoge__txt">
        テキスト5
        <br />
        テキスト5
        <br />
        テキスト5
      </p>
    </div>
  </div>
</div>
<!-- /.modHoge -->
```

```scss
@use '../../../node_modules/simplebar/dist/simplebar.css';

.modHoge {
  margin-left: 20px;
  margin-right: 20px;
  &__box {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .simplebar-scrollbar {
    &::before {
      background: #9c9c9c;
      height: 5px;
      top: 0;
      bottom: 0;
      border-radius: 5px;
    }
  }
  .simplebar-scrollbar.simplebar-visible {
    &::before {
      background: red;
      border-radius: 5px;
    }
  }
  .simplebar-track {
    background-color: #e5e5e5;
    height: 5px;
    border-radius: 5px;
  }
  &__boxInner {
    padding-bottom: 40px;
    display: table;
    // Latest safari
    _::-webkit-full-page-media,
    _:future,
    :root & {
      writing-mode: vertical-rl;
      display: none;
    }
    // Old safari
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      ::i-block-chrome,
      & {
        writing-mode: vertical-rl;
        display: none;
      }
    }
    &.-safari {
      display: none;
      // Latest safari
      _::-webkit-full-page-media,
      _:future,
      :root & {
        display: table;
      }
      // Old safari
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        ::i-block-chrome,
        & {
          display: table;
        }
      }
    }
  }
  &__txt {
    writing-mode: vertical-rl;
    display: table-cell;
    // Latest safari
    _::-webkit-full-page-media,
    _:future,
    :root & {
      display: block;
      height: 30em; //safariだと高さがなくなるので適宜調整
    }
    // Old safari
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      ::i-block-chrome,
      & {
        display: block;
      }
    }
  }
} //.modHoge
```

```JavaScript
import SimpleBar from 'simplebar';
//省略
scrollbarEvent() {
  let simpleBar;
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-scrollbar]'),
    (el) => {
      simpleBar = new SimpleBar(el, {
        autoHide: false,
        forceVisible: 'x'
      })
      setTimeout(function(){
        simpleBar.getScrollElement().scrollLeft = 2000; // 数値はテキスト量次第で適宜調整
      }, 500);
    }
  );
}
```

:::message
【setTimeout で遅延を設定している理由】
SimpleBar の初期化やスタイルの適用が完了するまでに多少時間がかかるので、遅延を設けてからスクロール位置を設定しています。遅延時間は状況に応じて調整が必要な場合があるかと思います。
:::

## 参考

- [SimpleBar](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar)
- [Safari 13 Release Notes](https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes#3314682)
