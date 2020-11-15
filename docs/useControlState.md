# `useControlState`

设置指定状态为受控或非受控(内部) [![][img-demo]](https://codesandbox.io/s/usewindowsize-w90zq)

## 代码演示

### 受控某状态

通常一个组件可以使用受控和非受控方式，通过这个 hook 简化其内部逻辑

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { useControlState } from "white-react-use";

const Demo = (props) => {
  const [value, setValue] = useControlState({
    isControl: 'value' in props,
    value: props.value,
    onChange: props.onChange,
  });

  return (
    <div>
      <div>{value}</div>
      <button onClick={() => setValue('new value')}>按钮</button>
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState('')

  return (
    <Demo value={value} onChange={(newV) => setValue(newV)} />
  );
}
```


## API

```jsx
const winSize = useWindowSize(mode, duration);
```

## 参数(Object)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isControl | 是否受控 | Boolean | - |
| initialValue | 初始值，当设置为受控时，该参数将会无效，使用value | any | - |
| value | 受控值，即指定的状态 | any | - |
| onChange | 状态改变事件<br/><br/>**签名**:<br/>Function(newValue: any)=>void<br/>**参数**:<br/>newValue: {any} 为该 hook 返回结果的第二个参数函数调用传入的值  | Function | - |


## 结果(Array)

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| 下标 0（value） | 若受控则为传入的value，不受控则为内部的value | any |
| 下标 1（setValue） | 改变状态函数，若有onChange将会调用；不受控将会修改内部状态<br/><br/>**签名**:<br/>Function(newValue: any)=>void<br/>**参数**:<br/>newValue: {any} 为需要改变的新状态值 | Function |


[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
