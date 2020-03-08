# `useHashQuery`

获取地址栏哈希后的查询参数 [![][img-demo]](https://codesandbox.io/s/usehashquery-751f0)


## 场景
需要使用地址栏哈希后的查询参数时


## 用法
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useHashQuery } from "white-react-use";

const Demo = () => {
  const hashQuery = useHashQuery();

  return <div>{JSON.stringify(hashQuery)}</div>;
};
```


## 参考
```ts
const hashQuery = useHashQuery();
```
#### 参数
- deps —— 可选，依赖项，默认值：[]，函数内部使用了 useMemo 缓存结果，该参数为 useMemo 的第二个参数

#### 返回值
Object —— 键值对 



[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
