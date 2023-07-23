---
title: 'Pixi.js（WebGL）の活用シーンなど'
date: '2023/07/08'
tags: ['Pixi.js', 'WebGL', 'JavaScript']
---

## Pixi.js とは

> PixiJS はウェブブラウザの canvas 要素に描画する、クロスブラウザ対応の軽量な JavaScript ライブラリ。
> JavaScript から GPU を扱う WebGL 技術を 2D に特化して平易に利用できる。
> WebGL 未対応の環境では従来の Canvas 描画方式に切り替えて描画され、プラットフォームの差異を吸収する。

[Wikipedia/PixiJS](https://ja.wikipedia.org/wiki/PixiJS)

## Web 制作/アプリ開発における Pixi.js の活用シーン

![](/images/note/post06/img01.png)

- 大量の DOM 要素を扱わなくてはならない場合

  - DOM 要素の数が増えるとブラウザのレンダリングに負荷が掛かるが、WebGL を介すことでスムーズにアニメーション動作を実現できる。
    マウスやタッチイベントの処理、レスポンシブ対応も可能。

- 複雑なビジュアルエフェクトを含むアニメーションを作成する場合
  - フィルタリングやシェーダーを使用して、要素や背景に Pixi.js 独自のさまざまなエフェクトを追加することができる。

## 描画処理の違い

通常の JavaScript では、ブラウザのレンダリングエンジンに依存するためパフォーマンスの制約があるが、Pixi.js は GPU を利用して描画を行うので大量の要素や複雑なグラフィックスを高速に処理できる。

## 実装フロー

```
開始
↓
レンダラーの初期化
↓
ステージの作成
↓
スプライトの作成
↓
テクスチャの作成
↓
スプライトの位置やサイズの設定
↓
ステージにスプライトを追加
↓
アニメーションの設定
↓
イベントリスナーの設定
↓
レンダリング
↓
終了
```

<br>
1. Pixi アプリケーションの作成
   描画領域を表す canvas 要素を作成する

```JavaScript
let app = new PIXI.Application({
	width: 600, // スクリーン(ビュー)横幅
	height: 600, // スクリーン(ビュー)縦幅
	backgroundColor: 0x1099bb, // 背景色 16進 0xRRGGBB
});
```

2. スプライトの作成
   画像やテクスチャを読み込みスプライトを作成する

```JavaScript
const textStyle = new PIXI.TextStyle( { fill: 0xffffff } )
const titleText = new PIXI.Text( "hogehoge", textStyle );
app.stage.addChild( titleText );
```

3. オブジェクトを動かしたり

```JavaScript
titleText.x = 350;
titleText.y = 300;
app.ticker.add( delta => {
	titleText.rotation += 0.05 * ( 1 + delta );
} );
```

4. DOM に Pixi アプリケーションを突っ込む
   `HTML`の`<main id="app"></main>`の中に先程作った PIXI アプリケーション(app)のビュー(canvas)を追加

```JavaScript
let el = document.getElementById('app');
el.appendChild(app.view);
```

※メソッドやオプションなどは下記参照
[https://pixijs.download/dev/docs/index.html](https://pixijs.download/dev/docs/index.html)
[https://qiita.com/takeshisakuma/items/2fc20a4b96f35433b27a](https://qiita.com/takeshisakuma/items/2fc20a4b96f35433b27a)

---

## gsap を併用する場合のディレクトリ構造の雛形メモ

```
_js
│  async.js
│  defer.js
│
├─common
│      *.js
│
├─layout
│      *.js
│
├─components
│      *.js
│
└─page
    │  [slug].js（Canvas.jsの実行とDOM要素の受け渡し）
    │
    └─[slug]
        │  Canvas.js （Canvasの根幹制御部分）
        │  Utility.js (よく使うユーティリティー関数)
        │  Variable.js (よく使う定数値：幅、高さ、ブレークポイントなど)
        │
        ├─dom（DOM要素管理）
        │      *.js
        │
        ├─object (Canvasオブジェクトの各コンポーネントの管理)
        │  │
        │  ├─[component01]
        │  │      *.js
        │  │
        │  ├─[component02]
        │  │      *.js
        │  │
        │  └─[component03]
        │            *.js
        │
        └─timeline (GSAPのタイムライン)
                *.js
```
