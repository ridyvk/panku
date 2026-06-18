# CORP DIVE

上場企業100社からランダムに1社を選び、公式サイトへ飛ぶPWAスターターです。

## 使い方

1. `index.html` をブラウザで開く、またはGitHub Pagesに配置
2. 真ん中の `GO` を押す
3. アニメーション後、ランダムに企業サイトへ移動

## 画像を追加する方法

1. 画像を `assets/art/` に入れる
2. `app.js` の `artAssets` にファイル名を追加

例：

```js
const artAssets = [
  { src: "assets/art/my-skull.webp", alt: "skull", slot: "a" },
];
```

`slot` は `a`〜`h` を指定できます。配置と動きが少し変わります。

## 企業データを増やす方法

`companies` 配列に以下の形式で追加します。

```js
{ code: "7203", name: "トヨタ自動車", sector: "輸送用機器", url: "https://global.toyota/jp/" }
```

## 注意

最初の100社はMVP用の初期データです。公開前にURLの最終確認を推奨します。
