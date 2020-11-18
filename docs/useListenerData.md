# `useListenerData`

利用 useEffect 监听数据变化，触发回调函数执行；相当于 useEffect(callback, target)；组件挂载时会执行一次回调；当组件更新时且监听的数据有变化会执行回调函数；

## 代码演示

### 基本用法

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useListenerData } from "white-react-use";

const Demo = ({ data1, data2 }) => {
  useListenerData([data1, data2], () => {
    console.log('组件挂载时 或 监听数据变化且组件更新时')
  })

  return null;
};
```

## API

```jsx
useListenerData(listenData, callback);
```

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| listenData | 一组监听数据数据，任何一个数据发生变化，在组件更新时会触发回调函数执行 | Array |  |
| callback | 回调函数，在组件挂载时会执行一次，当监听数据变化且组件更新时会执行 | Function |  |


[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
