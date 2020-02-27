# `useToggleArray`

状态：数组数据，透出方法可存储和移除数组内部数据 [![][img-demo]](https://codesandbox.io/s/usetogglearray-vqn24)


## 场景
如 多个复选框场景 ...


## 用法
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Checkbox, Row, Col } from "antd";
import { useToggleArray } from "white-react-use";

const Demo = () => {
  const [toggle, arr, setArr] = useToggleArray(["A"]);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    // setArr(checkedValues);
  }

  const onItemChange = (e) => {
    toggle(e.target.value);
  };

  return (
    <div>
      <Checkbox.Group value={arr} onChange={onChange}>
        <Row>
          <Col span={8}>
            <Checkbox value="A" onChange={onItemChange}>
              A
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="B" onChange={onItemChange}>B</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="C" onChange={onItemChange}>C</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="D" onChange={onItemChange}>D</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="E" onChange={onItemChange}>E</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
    </div>
  );
};
```


## 参考
```ts
const [toggle, arr, setArr] = useToggleArray(initialArr);
```
#### 参数
- initialArr —— 可选，初始化值，为数组

#### 返回值
类型：数组
- 下标0 —— 存储、移除切换函数，将指定数据存储进数组或移除数组中指定数据，其参数如下：
  - 必填，需要在数组中存储或移除的某项，如 'B'
  - 可选，指定是存储或移除，枚举值：save、remove；若该项为回调函数，则内部将该函数置为第3个参数，该参数置为 undefined
  - 可选，回调函数，用于内部判断某项数据在数组中是否被找到
    - 接收的参数：
      - 为切换函数参数，如 'B'
      - 数组的每一项，即遍历数组时的当前项
    - 返回值：true 或 false
- 下标1 —— 状态：数组
- 下标1 —— 手动设置数组，为 useState 返回的方法



[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
