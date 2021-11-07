# `useInterval`

定时器

## 场景

使用 setInterval 轮询指定的函数

## 代码演示

### 基本用法

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useInterval } from "white-react-use";

const Demo = ({ data }) => {
  const fn = () => { console.log('轮询打印') }
  const { getStatus, handle } = useInterval(fn, 800);

  return (
    <div 
      onClick={() => {
        // 停止轮询
        handle('stop')
      }}
    >{getStatus()}</div>
  );
};
```


## API

```typescript
 const { getStatus, handle } = useInterval(fn: () => void, interval: number | undefined | null, options?: Options);
```

### Params

| 参数 | 必填 | 类型 | 说明 | 默认值 |
| - | - | - | - | - |
| fn | 是 | Function | 要重复调用的函数 | - |
| interval | 是 | number \| undefined \| null | 间隔时间，当取值为 null 或 undefined 时会使用默认值 1000  | - |
| options | | Object | 配置计时器的行为，详见下面的 Options  | - |

### Options(Object)

| 参数 | 必填 | 类型 | 说明 | 默认值 |
| - | - | - | - | - |
| immediate |  | boolean | 参数可以用来控制是否在首次渲染时立即执行 | false |

## 结果(Object)

| 参数 | 类型 | 说明 |
| - | - | - |
| getStatus | () => 'doing' \| 'stopping' | 函数返回当前定时器轮询的状态 |
| handle | (type: 'do' \| 'stop', immediate?: boolean) => void | 手动操作定时器的启动与停止，immediate 在启动(type='do')时有效表示立即执行调用fn函数 |
