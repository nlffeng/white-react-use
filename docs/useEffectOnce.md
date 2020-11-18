# `useEffectOnce`

React的生命周期钩子，只运行一次 useEffect

## 代码演示

### 基本用法

相当于直接调用 useEffect(callback, [])

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useEffectOnce } from "white-react-use";

const Demo = () => {
  useEffectOnce(() => {
    console.log('挂载时一次')

    return () => {
      console.log('卸载时一次')
    }
  })

  return null;
};
```

## API

```jsx
useEffectOnce(callback);
```

## 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| callback | 回调函数，在组件挂载后调用一次，若返回值为函数则在组件卸载时被调用一次 | Function |  |
