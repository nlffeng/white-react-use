# `useFirstMountState`

组件是否为挂载时

## 代码演示

### 基本用法

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useFirstMountState } from "white-react-use";

const Demo = () => {
  const isFirstMount = useFirstMountState()

  if (isFirstMount) {
    console.log('挂载时')
  } else {
    console.log('更新时')
  }

  return null;
};
```

## API

```jsx
const isFirstMount = useFirstMountState()
```

## 参数

无

## 结果

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| isFirstMount | 布尔值，true为挂载时否则为更新时 | Boolean |
