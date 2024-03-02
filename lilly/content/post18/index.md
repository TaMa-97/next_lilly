---
title: '[ナレッジ] EJS'
date: '2023/11/25'
tags: ['EJS']
---

## <% %>

EJS 内で JavaScript を記述

## <%- %>

HTML として出力

## <%= %>

文字列として出力

## include()

ファイル読み込み

```javascript
<%- include( './footer.ejs' ); %>
<%- include(`${myPass}include/_footer.ejs`, { pass:myPass }) %>
```

## ループ

### for

```javascript
<% for(let i = 0; i < 5; i++) { %>
	<%- [i+1] %>
<% }; %>
```

### foreach

```javascript
<% const sampleAry = [
  {
    num: '',
    title:'',
    txt: ''
  },
  {
    num: '',
    title:'',
    txt: ''
  },
  {
    num: '',
    title:'',
    txt: ''
  }
]; %>
<% sampleAry.forEach((value, key)=> { %>
<%- value.num %>
<%- value.title %>
<%- value.txt %>
<% }); %>
```

```javascript
<% const nestAry = [
  {
    num: '',
    title:'',
    price: [
        {
          time: '',
          sum: ''
        },
    ]
  },
  {
    num: '',
    title:'',
    price: [
        {
          time: '',
          sum: ''
        },
    ]
  },
]; %>
<% nestAry.forEach((value, key)=> { %>
  <%- value.num %>
  <%- value.title %>
  <% value.price.forEach((value2, key2)=> { %>
    <%- value2.time %>
    <%- value2.sum %>
  <% }); %>
<% }); %>
```

```javascript
/**
 * 使用例
 */
<% const exampleAry= [
  {
    title:'タイトル',
    date:'0000.00.00',
    category: 'ニュースリリース',
    url:'#',
  },
  {
    title:'タイトル',
    date:'0000.00.00',
    category: 'お知らせ',
    url:'#',
    blank: true,
  },
  {
    title:'タイトル',
    date:'0000.00.00',
    category: 'おすすめ',
    url:'#',
    pdf: true,
  },
]; %>
<ul class="modListNews">
	<% exampleAry.forEach((value, key)=> {
		const targetBlank = value.blank ? ' target="_blank"' : '';
		const blank = value.blank ? ` -blank` : '';
		const pdf = value.pdf ? ` -pdf` : '';
	%>
	<li class="modListNews__item">
		<a href="<%- value.url %>"<%- targetBlank %> class="modListNews__item-inner<%- blank %><%- pdf %>">
			<span class="modListNews__item-category"><%- value.category %></span>
			<span class="modListNews__item-date"><%- value.date %></span>
			<span class="modListNews__item-txt"><%- value.title %></span>
			<span class="modListNews__item-icon"></span>
		</a>
	</li>
	<% }); %>
</ul>
```

```javascript
/**
 * 使用例
 */
const navData = [
  {
    label : 'HOME',
    url : '/'
  },
  {
    label : 'ナビ01',
    url : '/nav01/'
  },
  {
    label : 'ナビ02',
    url : '/nav02/'
  },
  {
    label : 'ナビ03',
    url : '/nav03/'
  },
  {
    label : 'ナビ04',
    url : '/nav04/'
  },
  {
    label : 'English',
    url : '/language/',
    language:true
  }
];
navData.forEach((val,i) =>{ %>
<li class="gNav__item<% if(val.language) { %> -language<% } %>">
  <a href="<%- val.url %>" class="gNav__link -nav0<%- i + 1 %>"<% if(val.blank) { %> target="_blank"<% } %>>
    <span class="gNav__link-inner"><%- val.label %></span>
  </a><% if(val.label === 'ナビ02') { %>
  <div class="gNavIn">
    <ul class="gNavIn__inner">
      <li class="gNavIn__item"><a href="<%- val.url %>0201/" class="gNavIn__link">ナビ02-01</a></li>
      <li class="gNavIn__item"><a href="<%- val.url %>0202/" class="gNavIn__link">ナビ02-02</a></li>
    </ul>
  </div>
  <% } %><% if(val.label === 'ナビ03') { %>
  <div class="gNavIn">
    <ul class="gNavIn__inner">
      <li class="gNavIn__item"><a href="<%- val.url %>0301/" class="gNavIn__link">ナビ03-01</a></li>
      <li class="gNavIn__item"><a href="<%- val.url %>0302/" class="gNavIn__link">ナビ03-02</a></li>
    </ul>
  </div>
  <% } %>
</li><% }); %>
```

## 条件分岐

### if

```javascript
<% if () { %>
<% } else if () { %>
<% } else { %}
<% } %>
```

### 三項演算子

```javascript
/**
 * 使用例
 */
<ul class="myBlockWork__list">
  <%
    const workList = [
      {
        id: '01',
        en: 'Work01',
        ja: 'グループ01',
        href: '/work01/',
        blank: false,
      },
      {
        id: '02',
        en: 'Work02',
        ja: '/work02/',
        href: '#',
        blank: false,
      },
      {
        id: '03',
        en: 'Work03',
        ja: '/work03/',
        href: '#',
        blank: false,
      },
      {
        id: '04',
        en: 'Work04',
        ja: '/work04/',
        href: '#',
        blank: false,
      },
      {
        id: '05',
        en: 'Work05',
        ja: '/work05/',
        href: '#',
        blank: false,
      },
      {
        id: '06',
        en: 'Work06',
        ja: '/work06/',
        href: '#',
        blank: false,
        diff: true,
      },
    ];
  %>
  <% workList.forEach((value, key)=> { %>
  <li class="myBlockWork__item <%- value.diff ? '-type02' : '' %>">
    <a href="<%- value.href %>" class="myBlockWork__link">
      <picture>
        <source srcset="<%- imgPath %>img_work<%- value.id %>_sp.jpg 1x,<%- imgPath %>img_work<%- value.id %>_sp@2x.jpg 2x" media="(max-width: 768px)">
        <img src="<%- imgPath %>img_work<%- value.id %>.jpg" srcset="<%- imgPath %>img_work<%- value.id %>@2x.jpg 2x" alt="">
      </picture>
      <div class="myBlockWork__link-inner">
        <p class="myBlockWork__link-txtEn"><%- value.en %></p>
        <p class="myBlockWork__link-txtJa"><%- value.ja %></p>
      </div>
    </a>
  </li><% }); %>
</ul>
```
