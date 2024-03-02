---
title: '[ナレッジ] jQuery'
date: '2023/11/25'
tags: ['jQuery']
---

## セレクター

```javascript
/**
 * HTMLルート要素
 */
$('html')

/**
 * body要素
 */
$('body')

/**
 * ID指定
 */
$('#hoge')

/**
 * クラス指定
 */
$('.hoge')

/**
 * タグ
 */
$('p')

/**
 * 複数セレクター
 */
$('.hoge, .fuga')

/**
 * 子孫セレクター
 */
$('.hoge .fuga')

/**
 * 親要素
 */
$('.hoge').parents('.fuga')

/**
 * 兄弟要素
 */

// 1つ前の要素
$('.hoge').prev('.fuga')

// 1つ後の要素
$('.hoge').next('.fuga')

// 兄弟要素を全て指定
$('.hoge').siblings('.fuga')

/**
 * 擬似クラス
 */
$('p:first-child')

/**
 * 否定擬似クラス
 */
$('p:not(:first-child)')
```

## 生成/付与

```javascript
/* 要素生成
const 変数名 = $("<生成する要素>",{
  "id" : "ID名",
  "class" : "クラス名",
   text : "ここにテキストを書きます",
	 href: "abc.html",
   target: "_blank",
	 style: 'color:red;',
	 css: {border: "5px solid gray"},
	 width: 100,
   height: 100,
	 on: {
	        click: function(event) {
	          alert("テスト");
	        }
	     }
});
*/
const $sampleDiv = $('<div>', {
  id: 'sample',
  class: 'sample',
  text: 'テキスト',
})

/**
 * data属性
 */
// data属性の設定
$('#sample').data('test', 'hoge')
// data属性の取得
console.log($('#sample').data('test'))

/**
 * CSS
 */
$('#sample').css('background-color', 'red')

/**
 * html
 */
$('#sample').html('<p>テスト</p>')

/*実行結果
<div class="hoge">
</div>
↓
<div class="hoge">
  <p>hoge</p>
</div>
*/
```

## 取得

```javascript
/**
 * .html()対象のHTML取得
 */
$('#hoge').html()
```

## 存在チェック

```javascript
/**
 * 要素の存在チェック
 */
if ($('.hoge').length) {
  // 存在する場合
} else {
  // 存在しない場合
}

/**
 * 特定の属性の存在チェック
 * 注意: jQueryにはhasAttrメソッドが標準では存在しないため、attrメソッドを使ってチェック
 */
if (typeof $('.hoge').attr('id') !== 'undefined') {
  // 存在する場合
}
```

## 書き換え

```javascript
/**
 * .html()
 *  要素のHTML内容の全書き換え
 */
$('#hoge1').html('<span>hoge</span>')

/**
 * .text()
 *  要素のテキスト内容の書き換え
 */
$('#hoge').text('テキスト')

/**
 * .val()
 *  フォーム要素のvalue値の変更
 */
$('.hoge').val('値')
```

## 挿入

```javascript
/**
 * .before()
 *  要素の前に別の要素を挿入
 */
$('#hoge').before("<p class='fuga'>fuga</p>")

/**
 * .after()
 *  要素の後ろに別の要素を挿入
 */
$('#hoge').after("<p class='fuga'>fuga</p>")

/**
 * .prepend()
 *  要素の最初の子として別の要素を挿入
 */
$('#hoge').prepend("<p class='fuga'>fuga</p>")

/**
 * .append()
 *  要素の最後の子として別の要素を挿入
 */
$('#hoge').append("<p class='fuga'>fuga</p>")

/**
 * .wrap()
 *  要素を別の要素で包む
 */
$('.hoge').wrap('<div></div>')

/**
 * .wrapInner()
 *  要素の子要素を別の要素で包む
 */
$('#hoge').wrapInner('<span></span>')

/**
 * .wrapAll()
 *  複数の要素を共通の親要素で包む
 */
$('.hoge').wrapAll('<div></div>')
```

## 除去

```javascript
/**
 * remove()
 * 要素を丸ごと削除する
 */
$('p span').remove()

/**
 * empty()
 * 要素の中身を空にする
 */
$('p').empty()

/**
 * unwrap()
 * 指定した要素を囲む親要素を削除する
 */
$('p').unwrap()
```

## 置換

```javascript
/**
 * prependTo()
 * 指定した要素内の最初に別の要素を移動させる
 */
$('#hoge').prependTo($('#fuga'))

/**
 * appendTo()
 * 指定した要素内の最後に別の要素を移動させる
 */
$('#hoge').appendTo($('#fuga'))

/**
 * replaceWith()
 * 指定した要素を別の要素で置換する
 */
$('p').replaceWith('<h1>fuga</h1>')
```

## 絞り込み

```javascript
/**
 * eq()
 * 指定したインデックス番号にある要素を取得する
 */
$('.hoge8').eq(2)

/**
 * not()
 * 引数に指定したセレクタに一致しない要素を取得する
 */
$('.menu').not('.fuga')

/**
 * children()
 * 直下の子要素を取得する
 */
$('#hoge').children().text('hoge')

/**
 * children()
 * class名で直下の子要素を絞り込む
 */
$('#hoge').children('.fuga').text('fuga')

/**
 * parent()
 * 親要素を取得する
 */
$('#hoge').parent().text('hoge')

/**
 * next()
 * 同階層の次の要素を取得する
 */
$('#hoge').next().text('hoge')

/**
 * prev()
 * 同階層の前の要素を取得する
 */
$('#hoge').prev().text('hoge')

/**
 * find()
 * 指定したセレクタに一致するすべての子孫要素を取得する
 */
$('#hoge').find('a')

/**
 * :first
 * 最初の要素を取得する
 */
$('.hoge:first').text('hoge')

/**
 * :last
 * 最後の要素を取得する
 */
$('.hoge:last').text('hoge')
```

## CSS

```javascript
/**
 * 取得
 */
const color = $('#hoge').css('color')

/**
 * 書き換え
 */
$('#hoge').css('color', '#000')
```

## animate

```javascript
/* アニメーション
$(セレクタ).animate(
    {
      CSSプロパティ,
    },
    時間,
    イージング,
    関数,
);
*/
$('.hoge').animate({ color: 'red' }, 2000, 'linear', function () {
  console.log('アニメーション完了時に実行されるコールバック')
})
```

## class

```javascript
/**
 * 追加
 */
$('#hoge').addClass('fuga')

/**
 * 削除
 */
$('#hoge').removeClass('fuga')

/**
 * 存在チェック
 */
$('#hoge').hasClass('fuga')

/**
 * 指定したクラスが存在すれば削除し、存在しなければ追加する
 */
$('#hoge').toggleClass('fuga')
```

## 属性

```javascript
/**
 * 属性の取得
 */
$('#hoge').attr('src')

/**
 * カスタムデータ属性の取得
 */
$('#hoge').data('fuga')

/**
 * 属性の書き換え
 */
$('#hoge').attr('src', 'assets/images/fuga.png')

/**
 * 属性の削除
 */
$('a').removeAttr('target')

/**
 * プロパティの設定または取得
 * 下記はラジオボタンのチェック状態を設定
 */
$(".hoge input[type='radio']:nth-child(1)").prop('checked', true)
```

## イベント

```javascript
/**
 * クリックイベントの設定
 */
$('#test').on('click', function () {
  // 処理内容
})

/**
 * 任意のイベントを強制的に発火
 */
$('#btn1').trigger('click')
```

## 要素幅

```javascript
/**
 * 要素の幅の取得
 */
$('#test').width()

/**
 * 要素の高さの取得
 */
$('#test').height()

/**
 * ウィンドウサイズの取得
 */
$(window).width()
```

## offset

```javascript
/**
 * offset()
 * 画面左上から特定のHTML要素までの距離を取得
 */
// 上部からの距離
let $top01 = $('#top01').offset().top

// 左側からの距離
let $left01 = $('#left01').offset().left
```

## scroll

```javascript
/**
 * スクロール量の取得と設定
 */
// 現在の垂直方向のスクロール位置を取得
let $scroll01 = $(window).scrollTop()

// 垂直方向にスクロール位置を設定
$(window).scrollTop(300)

// 現在の水平方向のスクロール位置を取得
let $scroll02 = $(window).scrollLeft()
```

## 読み込み

```javascript
/**
 * DOMが完全に読み込まれた後に実行されるイベント
 */
$(document).ready(function () {
  console.log('DOMが完全に読み込まれました')
})

/**
 * ページ上の全ての要素（画像など含む）が読み込まれた後に実行されるイベント
 */
$(window).on('load', function () {
  console.log('ページの全データが読み込まれました')
})
```

## ループ

### $.each()

```javascript
/**
 * $.each()
 * 配列のループ処理
 */
let array = ['test1', 'test2', 'test3', 'test4', 'test5']
$.each(array, function (index, value) {
  console.log(index + ': ' + value)
})
```

### .each()

```javascript
/**
 * .each()
 * DOM要素のループ処理
 */
$('.test').each(function (index, elem) {
  $(this).text(index + ': 処理内容 ' + $(elem).text())
})
```

## 表示/非表示

```javascript
/**
 * .show()
 * 要素を表示
 */
$('.test').show(500) // 0.5秒かけて表示

/**
 * .hide()
 * 要素を非表示
 */
$('.test').hide(500) // 0.5秒かけて非表示

/**
 * .toggle()
 * 要素の表示/非表示を切り替え
 */
$('.test').toggle(500) // 0.5秒かけて切り替え

/**
 * .fadeIn()
 * 要素をフェードイン
 */
$('.test').fadeIn(500) // 0.5秒かけてフェードイン

/**
 * .fadeOut()
 * 要素をフェードアウト
 */
$('.test').fadeOut(500) // 0.5秒かけてフェードアウト

/**
 * .fadeToggle()
 * フェードイン/アウトを切り替え
 */
$('.test').fadeToggle(500) // 0.5秒かけて切り替え

/**
 * .slideUp()
 * 要素をスライドアップ
 */
$('.test').slideUp(500) // 0.5秒かけてスライドアップ

/**
 * .slideDown()
 * 要素をスライドダウン
 */
$('.test').slideDown(500) // 0.5秒かけてスライドダウン

/**
 * .slideToggle()
 * スライドアップ/ダウンを切り替え
 */
$('.test').slideToggle(500) // 0.5秒かけて切り替え
```

## Ajax

```javascript
$.ajax('/hogehogeapi.json')
  .done(function (data) {
    console.log(data)
  })
  .fail(function () {
    console.log('error')
  })
```

## オブジェクト

### jQuery オブジェクトを jQuery オブジェクトとして取得

```javascript
const $divAll = $('div') // jQueryオブジェクト
const $divDom = $divAll.eq(1) // 2番目のdivをjQueryオブジェクトで取得
```

### jQuery オブジェクトを DOM オブジェクトとして取得

```javascript
const $divAll = $('div') // jQueryオブジェクト
const divDom = $divAll.get(1) // 2番目のdivをDOMオブジェクトで取得
```
