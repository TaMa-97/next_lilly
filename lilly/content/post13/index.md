---
title: 'macOSのChromeでのみCSSのblurがちらつく'
date: '2023/09/26'
tags: ['SCSS', 'JavaScript', 'UserAgent']
---

## 事象

macOS の GoogleChrome でのみ、blur を適用している要素の端に白い線が繰り返しちらつく問題が発生。

```scss
@keyframes fadezoom {
  0% {
    transform: scale(1.2);
    filter: blur(35px) brightness(1.01);
  }
  15% {
    filter: blur(0) brightness(1.01);
  }
  100% {
    transform: scale(1);
  }
}

animation: fadezoom 14s 0s forwards;
```

## 対処

blur の数値を変更したり、transform いじってみたりしたが解決には至らず、
時間もないので、macOS の Chrome のみは blur を適用させない対応で対処する。

```scss
// GoogleChromeにのみ適用
@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
}
```

上記 CSS ハックだと、他 OS の Chrome にも適用されてしまうので、ユーザーエージェント文字列から macOS と Chrome を検出する。
:::message
ユーザーエージェント文字列を使用するアプローチは、ブラウザの設定や変更に対して脆弱なため推奨しません
:::

```JavaScript
class Mv {
	constructor(){
		// 省略
		this.init();
	}
	init() {
		// 省略
		this.userAgent();
	}
	// 省略
	/**
	 * macOS上で実行されているChromeのみに適用
	 */
	userAgent() {
		const userAgent = navigator.userAgent.toLowerCase();
                const isMacOS = userAgent.includes("macintosh");
                const isChrome = /chrome/.test(userAgent);

                if (isMacOS && isChrome) {
                    const myBlockMvElement = document.querySelector(".myBlockMv");
                    myBlockMvElement.classList.add("-macChrome");
                }
	}
}
export default Mv;
```

```scss
&.-macChrome {
  @keyframes fadezoomChrome {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: fadezoomChrome 14s 0s forwards;
}
```
