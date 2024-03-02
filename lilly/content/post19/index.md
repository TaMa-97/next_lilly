---
title: '[ナレッジ] SCSS'
date: '2023/11/26'
tags: ['SCSS']
---

## 変数

```scss
$width: 25px;

.box {
  width: calc((100% - $width) / 2);
}
```

## ループ

### @for

```scss
@for $変数名 from 開始値 through 終了値（含む） {
}
@for $変数名 from 開始値 to 終了値（含まれない） {
}
```

```scss
// 利用例
@for $i from 1 to 5 {
  .test0#{$i} {
    background-image: url(#{$_imgPath}/bg-img0#{$i});
  }
}
```

### @each

```scss
@each $変数名（値） in 配列  {
}
@each $変数名（キー）, $変数名（値） in 配列  {
}
```

```scss
// 利用例
$_classList: (
  about: (
    index,
  ),
  company: (
    index,
  ),
  menu: (
    index,
    under,
    under,
  ),
);

@each $_id, $_class in $_classList {
  @each $_class-child in $_class {
    @at-root body#page_#{$_id}.-#{$_class-child} & {
      background-image: url(#{$_imgPath}#{$_id}/#{$_class-child}/bg_titlePage.jpg);
      @include g.retina {
        background-image: url(#{$_imgPath}#{$_id}/#{$_class-child}/bg_titlePage@2x.jpg);
      }
      @include g.tabletP {
        background-image: url(#{$_imgPath}#{$_id}/#{$_class-child}/bg_titlePage_sp.jpg);
        @include g.retina {
          background-image: url(#{$_imgPath}#{$_id}/#{$_class-child}/bg_titlePage_sp@2x.jpg);
        }
      }
    }
  }
}
// ----------------------------------------------------
// #補足
// @at-root でネストから外してbody#page_#{$_id}で出し分け
```

### @while

```scss
@while 繰り返す条件 {
繰り返す条件の処理
}
```

```scss
// 利用例
$i: 1;
@while $i < 5 {
  .hogehoge#{$i} {
    width: 100px * $i;
  }
  $i: $i + 1;
}
```

## 条件分岐

### @if

```scss
@if 条件 {
} @else if 条件 {
} @else {
}
```

## @at-root

ネストを解除する

```scss
// 利用例
$_nav: nav01, nav02, nav03, nav04;

@each $name in $_nav {
  @at-root #page_#{$name} [href*='#{$name}']#{&} {
    background-color: #ccc;
  }
}

@at-root #page_company [href$='company/']#{&} {
  background-color: #ccc;
}

// ----------------------------------------------------
// #補足
// 上記は配列内にスラッグを指定して各ページで出し分ける記述
// -「*」は含んでいるか
// -「&」は記述位置の親クラス
// -「$」は完全一致
```

## map-get

```scss:_variables.scss
// ----- color
$formColor:(
  border:var(--formColorBorder),
	placeholder:var(--formColorPlaceholder),
  error:(
      border:var(--formColorErrorBorder),
      color:var(--formColorErrorColor),
      bg:var(--formColorErrorBg)
  ),
  check:(
      border:var(--formColorCheckBorder),
      color:var(--formColorCheckColor),
      bg:var(--formColorCheckBg),
      bg02:var(--formColorCheckBg02)
  ),
);
```

```scss:*.scss
background:  map-get( map-get(g.$formColor, 'check'), bg );
border: 1px solid map-get( map-get(g.$formColor, 'check'), border );
```

## sass:math

```scss
@use 'sass:math';
line-height: math.div();
```

## %算出

```scss
math.percentage(math.div(,))
```

## @function

### vw 変換

```scss
@function get_vw($size, $viewport: 750) {
  $rate: math.div(100, $viewport);
  @return $rate * $size * 1vw;
}
// ---------------------------------
// #ロジック説明
// 1.引数としてサイズ（$size）とビューポートの幅（$viewport）を受け取る
// 2.$rate変数に、ビューポートの幅の逆数を格納する。（ビューポートの幅が100vwの1%に相当する比率）
// 3.関数は、$rate * $size * 1vwの計算結果を返す
```

## @mixin

### メディアクエリ(固定値)

```scss:_variables.scss
// ----- brake-point
$bp:(
	sphoneSE: 320px,
	sphoneP: 600px,
	tabletP: 768px
);
```

```scss:_mixin.scss
@mixin tabletP {
	@media only screen and (max-width: map-get(g.$bp, 'tabletP')) {
		@content;
	}
}

@mixin tabletPmin {
	@media only screen and (min-width: #{map-get(g.$bp, 'tabletP') + 1}) {
		@content;
	}
}

@mixin sphoneP {
	@media only screen and (max-width: map-get(g.$bp, 'sphoneP')) {
		@content;
	}
}

@mixin sphonePmin {
	@media only screen and (min-width: #{map-get(g.$bp, 'sphoneP') + 1}) {
		@content;
	}
}

@mixin sphoneSE {
	@media only screen and (max-width: map-get(g.$bp, 'sphoneSE')) {
		@content;
	}
}
```

### メディアクエリ（カスタム）

```scss:_mixin.scss
@mixin max($max) {
	@media only screen and (max-width: #{$max}px) {
		@content;
	}
}

@mixin min($min) {
	@media only screen and (min-width: #{$min}px) {
		@content;
	}
}
```

### retina 対応

```scss:_mixin.scss
@mixin retina {
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
        @content;
    }
}
```

### font-size(rem 算出)

```scss:_mixin.scss
@mixin fz($size: g.$baseFont, $important:false) {
	$result:math.div($size,16);
	font-size: if($important,($result + rem!important),($result + rem));
}
```

### animation

```scss:_mixin.scss
@mixin animation($animation-name,$s,$easing,$count,$end:none,$delay:0) {
	animation: $animation-name;
	animation-delay: $delay;
	animation-duration:$s;
	animation-fill-mode: $end;
	animation-iteration-count:$count;
	animation-timing-function: $easing;
}
```
