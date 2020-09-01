# `useWindowSize`

一个用于获取窗口尺寸的 Hook，内部监听了 resize 事件将会触发返回新的窗口尺寸 [![][img-demo]](https://codesandbox.io/s/usewindowsize-w90zq)

## 代码演示

### 基本用法

默认使用 requestAnimationFrame 节流(throttle)模式，频繁改变窗口大小会在每帧动画前更新窗口尺寸

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useWindowSize } from "white-react-use";

const Demo = () => {
  const { innerWidth, innerHeight, outerWidth, outerHeight } = useWindowSize();

  return (
    <div>
      <div>innerWidth: {innerWidth}</div>
      <div>innerHeight: {innerHeight}</div>
      <div>outerWidth: {outerWidth}</div>
      <div>outerHeight: {outerHeight}</div>
    </div>
  );
};
```

### 节流(throttle)模式

使用节流(throttle)模式，设置间隔时间，频繁改变窗口大小会每隔时间(传入参数)更新窗口尺寸

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useWindowSize } from "white-react-use";

const Demo = () => {
  const { innerWidth, innerHeight, outerWidth, outerHeight } = useWindowSize('throttle', 300);

  return (
    <div>
      <div>innerWidth: {innerWidth}</div>
      <div>innerHeight: {innerHeight}</div>
      <div>outerWidth: {outerWidth}</div>
      <div>outerHeight: {outerHeight}</div>
    </div>
  );
};
```

### 防抖(debounce)模式

使用防抖(debounce)模式，设置间隔时间(默认 300 ms)，频繁改变窗口大小会在间隔时间(传入)后更新窗口尺寸

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useWindowSize } from "white-react-use";

const Demo = () => {
  const { innerWidth, innerHeight, outerWidth, outerHeight } = useWindowSize('debounce', 500);

  return (
    <div>
      <div>innerWidth: {innerWidth}</div>
      <div>innerHeight: {innerHeight}</div>
      <div>outerWidth: {outerWidth}</div>
      <div>outerHeight: {outerHeight}</div>
    </div>
  );
};
```

## API

```jsx
const winSize = useWindowSize(mode, duration);
```

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 节流或防抖，窗口尺寸变化时，通过节流或防抖的方式更新返回值 | String | 'throttle' |
| duration | 间隔时间 | number \| string | 当 mode 为 'throttle' 时默认值为 'requestAnimationFrame'，否则为 300 |


## 结果

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| winSize | 窗口大小尺寸 | { innerWidth: number, innerHeight: number, outerWidth: number, outerHeight: number } |


[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
