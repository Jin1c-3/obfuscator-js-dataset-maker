# 制作混淆 `JavaScript` 代码

## 项目说明

这是一个制作 `js` 混淆代码的项目，只能混淆 `单文件 js` ，混淆后的数据集中有 `混淆代码+代码输出结果` ，用来评估反混淆器的效果。

## 混淆原理

分别使用了 [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) 和 [JSFuck](https://github.com/aemkei/jsfuck) 两种工具，感谢他们

在 `./index.js` 中有相应注释，可以查看代码原理.

## 使用方式

1. 安装依赖

```powershell
npm i
```

2. 向 `origin_code` 中增加代码，代码需要有输出。可以直接 `git clone` 多个项目

```
git clone https://github.com/xiaoyu2er/leetcode-js.git ./origin_code/xiaoyu2er_leetcode-js
git clone https://github.com/qianlongdoit/leetCode-js.git ./origin_code/qianlongdoit_leetCode-js
```

3. 运行

```powershell
npm run app
```
