---
title: 'アニメーションプロジェクトに最適なGSAP: 基本機能'
date: '2023/05/07'
tags: ['GSAP', 'JavaScript']
---

## はじめに

GSAP とはアニメーションを実装するために特化した JavaScript ライブラリです。

## 活用シーン例

- クリックといったイベントに応じて複雑なアニメーションを実装したい。
- スクロールに応じて特定の要素を動かす流行りのリッチコンテンツを作りたい。
- CSS Animations / Web Animations API では実現できそうにない。
- WebGLを用いてCanvasオブジェクトの動作制御をしたい。

など

## インストール

```bash
npm install gsap
```

## 基本機能

### Tween

`Tween` は、GSAP の核となる機能でアニメーションの開始状態と終了状態の間の補間を行います。

#### - メソッド

- `to`
- `from`
- `fromTo`
- `set`

```JavaScript
gsap.メソッド(
  アニメーションさせる要素,
  {
    プロパティ名:値,
    },
  発火タイミング(秒単位)
);
```

```JavaScript
// to：終点の状態（指定した状態にアニメーション）
gsap.to('.to', 1, { x: 10 });

// from：始点の状態（指定した状態からアニメーション）
gsap.from('.from', 1, { x: 10 });

// fromTo：始点と終点の状態
gsap.fromTo('.fromTo', 1,
   { x: -10 },
   { x: 10  }
);

// set：状態を設置
gsap.set('.set', { x: 10 });
```

#### - 発火タイミングの制御

数値単体以外に下記の値を指定できます

| 値       | 説明                              |
| -------- | --------------------------------- |
| `+=`数値 | 前の `Tween` の終了後から+秒後    |
| `-=`数値 | 前の `Tween` の終了前から-秒前    |
| `>`数値  | 最後の `Tween` の終了時の数値秒後 |
| `<`数値  | 最後の `Tween` の開始時の数値秒後 |

#### - オプション

| オプション    | 説明                                                           | デフォルト値   |
| ------------- | -------------------------------------------------------------- | -------------- |
| `duration`    | アニメーションの長さ                                           | `1.0`          |
| `ease`        | イージングの指定                                               | `power2.inOut` |
| `delay`       | アニメーションが開始されるまでの時間                           | `0`            |
| `repeat`      | リピート回数（-1 で無限ループ）                                | `0`            |
| `repeatDelay` | リピート時の遅延時間                                           | `0`            |
| `yoyo`        | リピート時の反復挙動（奇数回目は再生、偶数回目は逆再生）の有無 | `false`        |
| `paused`      | 一時停止状態にするかどうか                                     | `false`        |
| `overwrite`   | アニメーションを上書きするかどうか                             | `false`        |

#### - CSS プロパティ

- `opacity`
- `x`
- `xPercent`
- `y`
- `yPercent`
- `scale`
- `scaleX`
- `scaleY`
- `width`
- `height`
- `top`
- `left`
- `backgroundColor`
- `margin`
- `padding`
- `rotation`
- `skew`

など

### コールバック

`Tween`の開始時終了時など特定のタイミングで処理を走らせたい時に使える

```JavaScript
gsap.to('.hoge', 1,{
   onStart: () => {
       document.querySelector('.text').innerText = 'アニメーション開始時'
   },
   onComplete: () => {
       document.querySelector('.text').innerText = 'アニメーション完了時';
   },
   onUpdate: () => {
       document.querySelector('.text').innerText = 'アニメーション中';
   },
   onRepeat: () => {
       document.querySelector('.text').innerText = 'リピート開始';
   },
});
```

| コールバック              | 説明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `onComplete`              | アニメーション完了時に呼び出す関数                           |
| `onCompleteParams`        | ` onComplete` 関数に渡すための配列                           |
| `onRepeat`                | アニメーションのリピート開始時に呼び出す関数                 |
| `onRepeatParams`          | `onRepeat` 関数に渡すための配列                              |
| `onReverseComplete`       | アニメーションが逆方向から再び開始に達したときに呼び出す関数 |
| `onReverseCompleteParams` | `onReverseComplete` 関数に渡すための配列                     |
| `onStart`                 | アニメーションの開始時に呼び出す関数                         |
| `onStartParams`           | `onStart` 関数に渡すための配列                               |
| `onUpdate`                | アニメーション中に呼び出す関数                               |
| `onUpdateParams`          | `onUpdate` 関数に渡すための配列                              |

### stagger

`Stagger` は複数の同要素を連続で動かすことができる

```JavaScript
gsap.fromTo('.hoge', .5, {
   y: 30,
   autoAlpha: 0
},
{
   y: 0,
   autoAlpha: 1,
   repeat: -1,　// 繰り返し回数-1で無限
   stagger: {
       each: .5,
   }
})
```

| オプション | 設定値                                               | 説明                     |
| ---------- | ---------------------------------------------------- | ------------------------ |
| amount     | `0.1`[秒]                                            | アニメーションの合計時間 |
| each       | `0.1`[秒]                                            | アニメーション間隔の時間 |
| from       | -`start`-`center`-`end`-`edges`-`random`, または数値 | アニメーションの開始位置 |
| ease       | [公式参照](https://greensock.com/docs/v3/Eases)      | イージング               |

### Timeline

`Timeline`は`Tween`を連結して、連続したアニメーションを作れる

```JavaScript
// to()を連結してアニメーションを構成する場合
import { gsap } from "gsap";
//timeline作成
const tl = gsap.timeline();
//0秒後
tl.to(
  ".hoge",
  {
    x: 100,
  },
  0
)
//1秒後
.to(
  ".hoge",
   {
    y: 100,
  },
  1
)
//2秒後
.to(
  ".hoge",
  {
    x: 0,
  },
  2
)
//3秒後
.to(
  ".hoge",
  {
    y: 0,
  },
  3
);
```

### ScrollTrigger (スクロール制御)

`ScrollTrigger` はスクロールと連動してアニメーションを細かく設定できるプラグイン

```JavaScript
import ScrollTrigger from 'gsap/ScrollTrigger';
// npmやyarnでインストールした場合、`gsap.registerPlugin()`で指定する必要があります
gsap.registerPlugin(ScrollTrigger);

gsap.to('.hoge', {
  scrollTrigger: {
    trigger: '.trigger__elm', //アニメーションが始まるトリガーとなる要素
    start: 'top center', //ScrollTriggerの開始位置を指定
    end: '+=500', //ScrollTriggerの終了位置を指定（アニメーション開始位置から500px）
    pin: true, //トリガー要素を固定する
    markers: true, //デバッグ用マーカーの表示(triggerの位置、アニメーション開始・終了位置を表示可能)
    scrub: true, //アニメーションとスクロールバーの動きを紐付ける(スクロールに応じたアニメーションを実装したい時便利)
    toggleClass: { targets: ".hoge, .hoge02", className: "is-scroll" }, //クラスの付け外し(複数可)
    once: true,　//実行を一度きりにするか否か
  }
});
```

## さいごに

Tween、stagger、Timeline、ScrollTrigger などの機能を使って、Web サイトやアプリケーションでさまざまなアニメーションを実装することができます。

## 参考

- [GSAP docs](https://greensock.com/docs/)
- [GSAP Easing Functions](https://greensock.com/docs/v3/Eases)
- [GSAP Cheat Sheet](https://greensock.com/cheatsheet/)
