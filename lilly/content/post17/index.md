---
title: '[ナレッジ] JavaScript'
date: '2023/11/25'
tags: ['JavaScript']
---

## セレクター

```javascript
/**
 * HTMLルート要素取得
 */
document.documentElement

/**
 * body取得
 */
document.body

/**
 * ID
 */
document.getElementById('hoge')

/**
 * class
 */
document.querySelector('.hoge')

/**
 * 属性セレクター
 */
document.querySelector('[data-area="one"]')

/**
 * 複数
 */
document.querySelectorAll('.hoge, .fuga')

/**
 * 子孫
 */
document.querySelectorAll('.hoge fuga')

/**
 * 最も近い親
 */
elem.closest('.fuga')

/**
 * 直前の兄弟
 */
document.querySelector('hoge').previousElementSibling

/**
 * 直後の兄弟
 */
document.querySelector('hoge').nextElementSibling

/**
 * 特定の要素を基点として兄弟
 */
const hoge = document.querySelector('.hoge')
const hogeSiblings = hoge.parentElement.querySelector('.fuga')

/**
 * 擬似クラス
 */
document.querySelectorAll('hoge:first-child')

/**
 * 否定擬似クラス
 */
document.querySelectorAll('hoge:not(:first-child)')
```

## 生成/付与

```javascript
/**
 * data属性取得
 */
const sample = document.querySelector('#sample')
const testData = sample.getAttribute('data-test')

/**
 * data属性設定
 */
sample.setAttribute('data-test', 'hoge')

/**
 * CSSプロパティ設定
 */
sample.style.backgroundColor = 'red'

/**
 * 例
 */
const hoge01 = document.querySelector('.hoge')
const hoge02 = document.createElement('p')
hoge02.textContent = 'hoge'
hoge01.appendChild(hoge02)

/*
実行結果:
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
 * HTML取得
 */
const innerHtmlOfHoge = document.getElementById('hoge').innerHTML

/**
 * 2番目の要素のHTML取得
 */
const secondHogeInnerHtml = document.querySelectorAll('hoge')[1].innerHTML
```

## 存在チェック

```javascript
/**
 * 特定のセレクターに一致する要素が存在するかどうか
 */
if (document.querySelector('hoge') !== null) {
  // 存在する場合の処理
} else {
  // 存在しない場合の処理
}
```

## 書き換え

```javascript
/**
 * HTMLを書き換え
 */
document.getElementById('hoge1').innerHTML = '<span>hoge</span>'

/**
 * テキスト書き換え
 */
document.getElementById('hoge').textContent = 'テキスト'

/**
 * value属性を書き換え
 */
const hogeElement = document.querySelector('.hoge')
hogeElement.value = '値'
```

## 挿入

```javascript
/**
 * 起点要素外側の前に挿入
 */
const hoge01 = document.querySelector('.hoge')
const fuga01 = document.querySelector('.fuga')
hoge01.insertAdjacentElement('beforebegin', fuga01)

/*出力結果
<div class="hoge">
  <h1>hoge</h1>
</div>
 
<p class="fuga">fuga</p>
↓
<p class="fuga">fuga</p>
<div class="hoge">
  <h1>hoge</h1>
</div>
*/

/**
 * 起点要素外側の後に挿入
 */
const hoge02 = document.querySelector('.hoge')
const fuga02 = document.querySelector('.fuga')
hoge02.insertAdjacentElement('afterend', fuga02)

/*出力結果
<p class="fuga">fuga</p>
<div class="hoge">
  <h1>hoge</h1>
</div>
↓
<div class="hoge">
  <h1>hoge</h1>
</div>
<p class="fuga">fuga</p>
*/

/**
 * 起点要素内の最初に挿入
 */
const hoge03 = document.querySelector('.hoge')
const fuga03 = document.querySelector('.fuga')
hoge03.insertAdjacentElement('afterbegin', fuga03)

/*出力結果
<div class="hoge">
  <h1>hoge</h1>
</div>
<p class="fuga">fuga</p>
↓
<div class="hoge">
  <p class="fuga">fuga</p>
  <h1>hoge</h1>
</div>
*/

/**
 * 起点要素内の最後に挿入
 */
const hoge04 = document.querySelector('.hoge')
const fuga04 = document.querySelector('.fuga')
hoge04.insertAdjacentElement('beforeend', fuga04)

/*出力結果
<div class="hoge">
  <h1>hoge</h1>
</div>
<p class="fuga">fuga</p>
↓
<div class="hoge">
  <h1>hoge</h1>
  <p class="fuga">fuga</p>
</div>
*/

/**
 * 対象要素の親要素として追加
 */
const hoge05 = document.getElementById('hoge')
hoge05.outerHTML = `<div>${hoge05.outerHTML}</div>`

/*出力結果
<div>
  <p id="hoge">hoge</p>
</div>
↓
<div>
  <div>
    <p id="hoge">hoge</p>
  </div>
</div>
*/

/**
 * 対象要素の子要素を別の親要素で囲む
 */
const hoge06 = document.getElementById('hoge')
hoge06.innerHTML = `<span>${hoge06.innerHTML}</span>`

/*出力結果
<div>
  <p id="hoge">hoge</p>
</div>
↓
<div>
  <p id="hoge"><span>hoge</span></p>
*/

/**
 * 全対象要素の親要素として追加
 */
const hoge07 = document.querySelectorAll('.hoge')
const wrapElement = document.createElement('div')
hoge07[0].parentNode.insertBefore(wrapElement, hoge07[0])
hoge07.forEach((element) => {
  wrapElement.appendChild(element)
})

/*出力結果
<p class="hoge">hoge</p>
<p class="hoge">hoge</p>
<p class="hoge">hoge</p>
↓
<div>
  <p class="hoge">hoge</p>
  <p class="hoge">hoge</p>
  <p class="hoge">hoge</p>
</div>
*/

/**
 * insertAdjacentHTMLを使用して文字列のHTMLをパースして特定の要素の中や前後に挿入
 * 挿入位置は4種類（beforebegin, afterbegin, beforeend, afterend）
-------------------------
<!-- beforebegin -->
<element>
  <!-- afterbegin -->
  <child>Text</child>
  <!-- beforeend -->
</element>
<!-- afterend -->
*/
const targetElement = document.querySelector('対象要素のセレクター')
targetElement.insertAdjacentHTML('挿入位置', '<div class="test">テスト</div>')
```

## 除去

```javascript
/**
 * 要素を丸ごと削除
 */
const targetToRemove = document.querySelector('p')
targetToRemove.remove()

/**
 * 子要素を削除（要素の中身を削除）
 */
const targetForChildRemoval = document.querySelector('p')
const nestToRemove = targetForChildRemoval.querySelector('span')
targetForChildRemoval.removeChild(nestToRemove)
/*
出力結果:
<p><span>fuga</span>hoge</p>
↓
<p>hoge</p>
*/

/**
 * 指定要素を囲むタグ（1階層上の親タグのみ）を削除し、その要素のみを保持する
 */
const targetForUnwrapping = document.querySelector('p')
const parentToUnwrap = targetForUnwrapping.parentNode
const grandParentToReplace = parentToUnwrap.parentNode
grandParentToReplace.innerHTML = targetForUnwrapping.outerHTML
/*
出力結果:
<span><p>hoge</p></span>
↓
<p>hoge</p>
*/
```

## 置換

```javascript
/**
 * 起点要素内の最初に置換
 */
const hogeForFirstReplace = document.getElementById('hoge')
const fugaForFirstReplace = document.getElementById('fuga')
hogeForFirstReplace.insertBefore(
  fugaForFirstReplace,
  hogeForFirstReplace.firstElementChild
)
/*
出力結果:
<ul id="hoge">
  <li>hoge1</li>
  <li>hoge2</li>
  <li id="fuga">fuga</li>
</ul>
↓
<ul id="hoge">
  <li id="fuga">fuga</li>
  <li>hoge1</li>
  <li>hoge2</li>
</ul>
*/

/**
 * 起点要素内の最後に置換
 */
const hogeForLastReplace = document.getElementById('hoge')
const fugaForLastReplace = document.getElementById('fuga')
hogeForLastReplace.appendChild(fugaForLastReplace)

/**
 * 引数の要素に置換
 */
const targetForOuterReplace = document.querySelector('p')
targetForOuterReplace.outerHTML = '<h1>fuga</h1>'
/*
出力結果:
<p>hoge</p>
↓
<h1>fuga</h1>
*/
```

## 絞り込み

```javascript
/**
 * HTML要素の順番（インデックス番号）を指定して取得
 */
const thirdHoge8 = document.querySelectorAll('.hoge8')[2]

/**
 * 引数に除外したい要素を指定して取得
 */
const hogeElements = document.querySelectorAll('hoge')
for (let i = 0; i < hogeElements.length; i++) {
  if (!hogeElements[i].classList.contains('fuga')) {
    // 処理内容
  }
}

/**
 * 直下の子要素を取得
 */
const directChildren = document.getElementById('hoge').children
for (let i = 0; i < directChildren.length; i++) {
  directChildren[i].textContent = 'hoge'
}

/**
 * class名で抽出
 */
const childrenByClass = document.getElementById('hoge').children
for (let i = 0; i < childrenByClass.length; i++) {
  if (childrenByClass[i].classList.contains('fuga')) {
    childrenByClass[i].textContent = 'fuga'
  }
}
/**
 * 親要素を取得
 */
document.getElementById('hoge').parentNode.textContent = 'hoge'

/**
 * 同階層の対象要素の次に配置されている要素だけ取得
 */
document.getElementById('hoge').nextElementSibling.textContent = 'hoge'

/**
 * 対象要素の直前に配置されている要素を取得
 */
document.getElementById('hoge').previousElementSibling.textContent = 'hoge'

/**
 * 全ての子孫要素から取得
 */
const descendantLink = document.getElementById('hoge').querySelector('a')

/**
 * 最初の要素を取得
 */
document.querySelectorAll('hoge')[0].textContent = 'hoge'

/**
 * 最後の要素を取得
 */
const allHoge = document.querySelectorAll('hoge')
allHoge[allHoge.length - 1].textContent = 'hoge'
```

## CSS

```javascript
/**
 * スタイル取得
 */
const hogeStyle = document.defaultView.getComputedStyle(
  document.getElementById('hoge'),
  null
).color

/*
getComputedStyle()は、「スタイルの値に同的に含まれる可能性のある計算を解決」した後に
要素に適用されているスタイルが格納されたオブジェクトを返す
第一引数：styleを取得したい要素
第二引数：擬似要素に相当する文字列
  例：document.defaultView.getComputedStyle(hoge, ":after").width;
*/

/**
 * スタイル書き換え
 */
document.getElementById('hoge').style.color = '#000'
```

## animate

```javascript
const animationSample = document.querySelector('.hoge')
animationSample.addEventListener('click', function () {
  this.animate(
    [
      {
        // 変化前の状態
        backgroundColor: 'red',
        transform: 'scale(1)',
        offset: 0.2, // 20%
      },
      {
        // 中間状態
        backgroundColor: 'blue',
        transform: 'scale(1)',
        offset: 0.4, // 40%
      },
      {
        // 変化後の状態
        backgroundColor: 'green',
        transform: 'scale(2)',
        offset: 1, // 100%
      },
    ],
    {
      duration: 3000, // アニメーションスピード
      easing: 'ease-in-out', // イージングを設定
      fill: 'forwards', // アニメーション終了状態を維持
      iterations: Infinity, // 繰り返しの回数を指定。数値で回数、Infinityで無限
    }
  )
})
```

## class

```javascript
/**
 * クラス追加
 */
document.getElementById('hoge').classList.add('fuga')

/**
 * クラス削除
 */
document.getElementById('hoge').classList.remove('fuga')

/**
 * クラスを持っているかどうか確認
 */
document.getElementById('hoge').classList.contains('fuga')

/**
 * クラスを持っていれば削除、持っていなければ追加
 */
document.getElementById('hoge').classList.toggle('fuga')
```

## 属性

```javascript
/**
 * 属性取得
 */
const srcValue = document.getElementById('hoge').getAttribute('src')

/**
 * カスタムデータ属性取得
 */
const dataFugaValue = document.getElementById('hoge').dataset.fuga
/**
 * 属性書き換え
 */
document.getElementById('hoge').setAttribute('src', 'assets/images/fuga.png')

/**
 * 属性削除
 */
document.querySelector('a').removeAttribute('target')

/**
 * 属性プロパティに値を設定
 */
document
  .querySelector(".hoge input[type='radio']:nth-child(1)")
  .setAttribute('checked', 'checked')
```

## イベント

```javascript
/**
 * イベントリスナー
 */
document.getElementById('test').addEventListener(
  'click',
  function () {
    // 処理内容
  },
  false
)

/**
 * ※`passive: true`で、`event.preventDefault()`が呼ばれないことを宣言（処理の軽量化）
 */
document.getElementById('test').addEventListener(
  'scroll',
  function () {
    // 処理内容
  },
  { passive: true }
)
```

## 要素幅

```javascript
/**
 * 要素の幅（borderとスクロールバーを含む）を取得
 */
const offsetWidth = document.getElementById('test').offsetWidth

/**
 * 要素の幅（paddingまで）を取得
 */
const clientWidth = document.getElementById('test').clientWidth

/**
 * 要素の高さ（borderとスクロールバーを含む）を取得
 */
const offsetHeight = document.getElementById('test').offsetHeight

/**
 * 要素の高さ（paddingまで）を取得
 */
const clientHeight = document.getElementById('test').clientHeight

/**
 * ウィンドウの幅（スクロールバーを含む）を取得
 */
const windowInnerWidth = window.innerWidth

/**
 * ウィンドウの高さ（スクロールバーを含む）を取得
 */
const windowInnerHeight = window.innerHeight

/**
 * ブラウザ全体の幅（サイドバーなどを含む）を取得
 */
const windowOuterWidth = window.outerWidth

/**
 * ブラウザ全体の高さ（タブやブックマークバーなどを含む）を取得
 */
const windowOuterHeight = window.outerHeight
```

## offset

```javascript
/**
 * 画面左上からHTML要素までの距離（上方向）を取得
 */
const topElement = document.getElementById('top01')
const topPosition = topElement.getBoundingClientRect()
const scrollTop = window.pageYOffset || document.documentElement.scrollTop
const positionTop = topPosition.top + scrollTop
//※getBoundingClientRectは、ブラウザの表示領域の左上を(0, 0)として、そこから相対位置を取得する

/**
 * 画面左上からHTML要素までの距離（左方向）を取得
 */
const leftElement = document.getElementById('left01')
const leftPosition = leftElement.getBoundingClientRect()
const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
const positionLeft = leftPosition.left + scrollLeft
```

## scroll

```javascript
/**
 * スクロール量(top)を取得
 */
const scrollY = document.documentElement.scrollTop || document.body.scrollTop

/**
 * スクロール量を指定して移動
 */
window.scrollTo(0, 300)
//(0,300)部分は(x軸,y軸)

/**
 * スムーススクロール
 */
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth',
})
```

## 読み込み

```javascript
/**
 * DOMが読み込まれたら実行
 */
document.addEventListener('DOMContentLoaded', function () {
  // 処理内容
})

/**
 * ページのデータが全て読み込まれたら実行
 */
window.addEventListener('load', function () {
  // 処理内容
})
```

## ループ

### for

```javascript
const array = ['test1', 'test2', 'test3', 'test4', 'test5']
for (let i = 0; i < array.length; i++) {
  console.log(array[i])
}
```

### forEach

```javascript
const array1 = ['a', 'b', 'c']
array1.forEach((element) => console.log(element))
```

### for...in

```javascript
const object = { a: 1, b: 2, c: 3 }
for (const property in object) {
  console.log(`${property}: ${object[property]}`)
}
```

### for...of

```javascript
const array = ['a', 'b', 'c']
for (const element of array) {
  console.log(element)
}
```

## 分岐

### if

```javascript
if (条件1) {
  // 条件1がtrueの場合の処理
} else if (条件2) {
  // 条件2がtrueの場合の処理
} else {
  // いずれの条件もfalseの場合の処理
}
```

### switch

```javascript
switch (条件) {
  case 選択肢1:
    // 選択肢1だった時の処理
    break
  case 選択肢2:
    // 選択肢2だった時の処理
    break
  case 選択肢3:
    // 選択肢3だった時の処理
    break
  default:
  // いずれにも当てはまらなかった時の処理
}
```

### 三項演算子

```javascript
/**
 * '条件' ? '条件がtrueの場合' : 'falseの場合'
 */
let age = 19
let drink = age >= 20 ? 'Beer' : 'Orange Juice'
```

## テンプレートリテラル

```javascript
const hare = '晴れ'
const ame = '雨'
const txt = `今日は${hare}、明日は ${ame}です`

const tenki = ['晴れ', '雨', '曇り']
console.log(`明日は${tenki[0]}または${tenki[1]}もしかしたら${tenki[2]}です`)
```

## 非同期処理

### Fetch API

非同期 HTTP リクエストを行うための JavaScript の標準 API で、`Promise`オブジェクトを返す
Promise オブジェクトが成功（`resolve`）または失敗（`reject`）したときに実行される処理は、`then()`、`catch()`、`finally()`メソッドを使用してチェーンできる

- `then()`メソッド : リクエストの成功時の処理をチェーンする
- `catch()`メソッド : リクエスト処理中に発生したエラーをキャッチし処理する
- `finally()`メソッド : 成功時も失敗時も、最終的に必ず実行される処理を記述する

```javascript
fetch('https://hogehogeapi.com/data')
  .then((response) => {
    return response.json() // レスポンスボディをJSONとして解析
  })
  .then((data) => {
    console.log(data) // 解析されたデータを処理
  })
  .catch((error) => {
    console.error('Fetch error:', error) // エラー処理
  })
```

### Async/Await

`Promise`に基づく非同期処理をより簡潔に扱うための機能
`then()`メソッドをチェーンする従来の Promise の記述方法に比べて簡潔に書けるので読みやすい
`async`が付いた関数内で`await`を使用することで、`Promise`の完了を待つことができる

```javascript
async function fetchData() {
  try {
    const response = await fetch('/test_data.json')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
fetchData()
```

### Axios

ブラウザ,Node.js で動作する Promise ベースの HTTP クライアントの外部ライブラリ
リクエストのキャンセル、JSON データの自動変換など追加機能あり

```javascript
axios
  .get('/hogehoge.json')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

## localStorage

Web ページのセッション間でデータを保存するための Web Storage API の一部
文字列の形でデータを保存およびアクセスすることができる

```javascript
/**
 * キーと値のペアを保存、取得、削除
 */

// データをlocalStorageに保存
localStorage.setItem('key', 'value')

// localStorageからデータを取得
const value = localStorage.getItem('key')
console.log(value) // 'value'

// localStorageからデータを削除
localStorage.removeItem('key')
```

## Cookie

Web サーバーとクライアント（ユーザーのブラウザ）間で情報を保持して交換するために使用する
使い所：セッション管理（ログイン状態の保持）などに使用
※約 4KB までのデータしか保存できない

### セキュリティ対策

- `Secure`属性 : Cookie が HTTPS 経由でのみ送信されることを保証する
- `HttpOnly`属性 : Cookie への JavaScript からのアクセスを防ぐ（XSS 攻撃対策）
- `SameSite=Strict`属性 : Cookie が同じオリジンのリクエストに対してのみ送信されるようにする（CSRF 攻撃対策）

```javascript
/**
 * クッキーの設定、取得、削除
 */

// クッキーを設定（有効期限を1ヶ月後に設定）
const now = new Date()
const oneMonthLater = new Date(now.setMonth(now.getMonth() + 1)) // 現在の日付から1ヶ月後の日付
const expires = oneMonthLater.toUTCString() // GMT形式に変換
document.cookie = `username=HogeHuge; path=/; expires=${expires}; Secure; HttpOnly; SameSite=Strict`

// クッキーを取得
const cookies = document.cookie.split('; ').reduce((acc, current) => {
  const [key, value] = current.split('=')
  acc[key] = value
  return acc
}, {})

// クッキーを削除
document.cookie =
  'username=; path=/; expires=Thu, 01 Jan 1990 00:00:00 GMT; Secure; HttpOnly; SameSite=Strict'
```

## スプレッド構文

スプレッド構文「`...`」で、配列やオブジェクトの要素を全て展開
使い所：配列やオブジェクトのコピー、配列/オブジェクトの結合や更新など

```javascript
/**
 * オブジェクトのコピー
 */
const obj = { a: 1, b: 2, c: 3 }
const obj2 = { ...obj } // objをコピー

/**
 * オブジェクトに要素を追加しつつコピー
 */
const obj3 = { ...obj, d: 4 } // objにd: 4を追加してコピー

/**
 * 配列の展開
 */
const arr = [1, 2, 3]
const arr2 = [...arr, 4, 5] // arrに4, 5を追加して新しい配列を作成
```

## アロー関数

```javascript
/**
 * 従来の関数
 */
function add(a) {
  return a + 100
}
/**
 * アロー関数に書き換え
 */
const add = (a) => a + 100
```

## 分割代入

### 配列の場合

```javascript
const obj = ['HogeHuge', 25]

/**
 * 今まで（配列データを変数に代入したり引数に渡すときはまるごと渡すしかなかった）
 */
const hoge = function (obj) {
  console.log(`Hi, ${obj[0]}! I'm ${obj[1]}.`)
}
hoge(obj)

/**
 * あるいは呼び出すときに個別に
 */
const hoge = function (name, age) {
  console.log(`Hi, ${name}! I'm ${age}.`)
}
hoge(obj[0], obj[1])

/**
 * 分割代入（配列の特定の要素に簡単にアクセスできる）
 */
const hoge = function ([name, age]) {
  console.log(`Hi, ${name}! I'm ${age}.`)
}
hoge(obj)
```

### オブジェクトの場合

```javascript
const obj = {
  name: 'HogeHuge',
  age: 25,
}

/**
 * 今まで（オブジェクトデータを変数に代入したり引数に渡すときはまるごと渡すしかなかった）
 */
const hoge = function (obj) {
  console.log(`Hi, ${obj.name}! I'm ${obj.age}.`)
}
hoge(obj)

/**
 * あるいは呼び出すときに個別に
 */
const hoge = function (name, age) {
  console.log(`Hi, ${name}! I'm ${age}.`)
}
hoge(obj.name, obj.age)

/**
 * 分割代入（プロパティを直接抽出して使用できる）
 */
const hoge = function ({ name, age }) {
  console.log(`Hi, ${name}! I'm ${age}.`)
}
hoge(obj)
```

## デストラクチャリング代入（分割代入の応用）

オブジェクトや配列から複数の値を一度に取り出すことができる

```javascript
const obj = { x: 1, y: 2, z: 3 }
const { x, y, z } = obj
```

## クラス構文

```javascript
/**
 * @class Sample
 * @description 雛形サンプル
 */
class Sample {
  /**
   * 初期設定
   */
  constructor() {
    this.sampleSelector = document.querySelector('#sample01')
    this.eventHandler()
  }

  /**
   * イベントハンドラの実行タイミング管理
   */
  eventHandler() {
    this.sampleEvents()
  }

  /**
   * 特定のイベントに対する処理
   */
  sampleEvents() {
    this.sampleSelector.addEventListener('click', () => {
      console.log('Hogehoge')
    })
  }
}

// インスタンス作成
new Sample()
```

## モジュールインポート・エクスポート

JavaScript ファイル間でのコードの再利用

```javascript
// import
import { Hoge } from './hoge.js'

// export
export const hoge = (a, b) => a + b
```

## 関数のデフォルト引数

```javascript
/**
 * 関数の引数にデフォルト値を持たせる
 */
function hoge(a, b = 1) {
  return a * b
}

console.log(hoge(5, 2)) // 10
console.log(hoge(5)) // 5
```

## Rest パラメータ

関数に任意の数の引数を安全に渡すことができる
使い所：引数の数が事前に定義されていない場合など

```javascript
function sum(...args) {
  return args.reduce((acc, current) => acc + current, 0) // 任意の数の引数を受け取り合計する
}
```

## 配列処理

### forEach

配列を単純に反復処理したい場合

```javascript
const objectMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3'],
])
objectMap.forEach((value, key) => {
  console.log(`これは ${key} でこれは ${value}`)
})
```

### map

配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成する
※foreach と同様の処理は可能

使い所：

- データの変換や加工が必要なら「map メソッド」
- データの変換や加工が不要なら「forEach メソッド」

```javascript
const array1 = [1, 4, 9, 16]
const map1 = array1.map((x) => x * 2)
console.log(map1) // [2, 8, 18, 32]
```

### filter

条件に合った要素のみを含む新しい配列を生成する

使い所：特定の条件を満たす要素を抽出する際に使用

```javascript
const hoge = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const evens = hoge.filter((value) => value % 2 === 0)
console.log(evens) // [2,4,6,8,10]
```

### reduce

配列内の各要素を結合して単一の値（数値、オブジェクト、配列など）を生成する

使い所：合計値の計算など

```javascript
const hoge = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const sum = hoge.reduce((prev, current) => prev + current)
console.log(sum) // 55
```

### sort

配列内の要素をソートする

```javascript
const numbers = [4, 2, 5, 1, 3]
numbers.sort((a, b) => a - b)
console.log(numbers) // [1, 2, 3, 4, 5]
```

### find

配列内の要素から最初に条件に合った要素を返す

使い所：特定の条件を満たす要素を見つけるときなど

```javascript
const hoge = [1, 2, 3, 4, 5]
const found = hoge.find((element) => element > 3)
console.log(found) // 4
```

## URL 取得

```javascript
let url = window.location.pathname
let urlParts = url.split('/')
let slug = urlParts[urlParts.length - 2] //適宜取得したい箇所
```

## レスポンシブ

### リサイズするたびに実行 ※非推奨

```javascript
const checkWindow = () => {
  if (window.innerWidth >= 768) {
    console.log('768px以上')
  } else {
    console.log('768px未満')
  }
}
window.addEventListener('resize', checkWindow)

// 初期化処理
checkWindow()
```

### ブレークポイントが切り替わるタイミングのみ実行 ※推奨

```javascript
const mediaQueryList = window.matchMedia('(min-width: 768px)')

const checkWindow = (event) => {
  if (event.matches) {
    console.log('768px以上')
  } else {
    console.log('768px未満')
  }
}

mediaQueryList.addEventListener('change', checkWindow)

// 初期化処理
checkWindow(mediaQueryList)
```
