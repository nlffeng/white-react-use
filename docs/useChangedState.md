# `useChangedState`

监听数据变化，生成可变的状态

## 场景
重新挂载组件：生成的状态可用于组件 key 属性使其重新挂载

## 代码演示

### 基本用法

监听 data 变化，会返回新的状态；在组件挂载时默认返回 0；在组件更新时才会返回新值。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useChangedState } from "white-react-use";

const Demo = ({ data }) => {
  const changedState = useChangedState({
    listenFactor: data,
  });

  return (
    <CustomComponent key={changedState} />
  );
};
```

### 回调函数控制

监听 data 变化，回调函数处理是否返回新的状态；在组件挂载时默认返回 0；在组件更新时才会返回新值。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useChangedState } from "white-react-use";

const Demo = ({ data }) => {
  const changedState = useChangedState({
    listenFactor: data,
    // 当组件更新时，且 data 变化后为 4 时，则返回新的状态
    isRemountFn: data => data === 4,
  });

  return (
    <CustomComponent key={changedState} />
  );
};
```

### 监听一组数据，回调函数控制

监听一组数据变化，回调函数处理是否返回新的状态；在组件挂载时默认返回 0；在组件更新时才会返回新值。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useChangedState } from "white-react-use";

const Demo = ({ a, b, c }) => { // a=1,b=3,c=4
  const changedState = useChangedState({
    listenFactors: [a, b, c],
    // 如果没有回调函数，当组件更新时，且 a、b、c 当中任意一个数据变化后，则返回新的状态
    // 有回调函数时，则仅当 b=5 时才返回新的状态
    isRemountFn: v => v[2] === 5,
  });

  return (
    <CustomComponent key={changedState} />
  );
};
```

### 监听多组数据，回调函数控制

监听多组数据变化，任意一组数据满足变化则返回新的状态。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useChangedState } from "white-react-use";

const Demo = ({ a, b, c }) => { // a=1,b=3,c=4
  const changedState = useChangedState([
    {
      listenFactor: a,
      // 当组件更新时，且 a 变化后为 5 时则返回新的状态
      isRemountFn: v => v === 5,
    },
    {
      listenFactors: [b, c],
      // 当组件更新时，且 c 变化后为 9 时则返回新的状态
      isRemountFn: v => v[1] === 9,
    },
  ]);

  return (
    <CustomComponent key={changedState} />
  );
};
```

## API

```jsx
const changedState = useChangedState({
  listenFactor,
  listenFactors,
  isRemountFn,
})
// 或者
const changedState = useChangedState([
  {
    listenFactor,
    listenFactors,
    isRemountFn,
  },
  {
    listenFactor,
    listenFactors,
    isRemountFn,
  },
  // ...
])
```

## 参数(Object | Array)

### Object

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| listenFactor | 需要监听的数据，在组件更新时该数据被作为浅比较触发是否返回新的状态 | any | |
| listenFactors | 需要监听的一组数据，在组件更新时该数组中任意一项数据被作为浅比较后为变化则返回新的状态；同时传入 listenFactors 和 listenFactor ，参数 listenFactor 将会失效 | Array | |
| isRemountFn | 非必填，若传入则在组件更新时且监听的数据发生变化后，将通过该函数返回值 true 或 false 控制是否返回新的状态 | Function | |

### Array

数组中每项为上述 Object


## 结果(Number)

| 说明 | 类型 |
| --- | --- |
| 0 - 10000 内变化的值，组件挂载时为 0，每次更新变化后 +1 | Number |


[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
