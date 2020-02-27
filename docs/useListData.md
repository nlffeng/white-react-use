# `useListData`

根据传入请求Api，透出列表、分页数据和加载函数(封装了请求Api，内部处理了列表和分页数据) [![][img-demo]](https://codesandbox.io/s/uselistdata-0js8z)


## 场景
分页列表场景


## 用法
```jsx
import React, { useEffect } from 'react';
import { useListData } from 'white-react-use';

const loadApi = (params) => {
  console.log(params);

  // 模拟具体请求方法
  return Promise.resolve({
    total: 100,
    list: [1, 3, 4, 5],
  });
};

function Home(props) {
  const [loadDataFn, list, setList, pagination, setPagination] = useListData(loadApi);

  useEffect(() => {
    loadDataFn({
      pageNum: 1,
      pageSize: 10,
    });
  }, []);

  return (
    <div>
      {list.map(item => (
        <p key={`${item}`}>{item}</p>
      ))}

      {JSON.stringify(pagination)}
    </div>
  );
}
```


## 参考
```ts
const [loadDataFn, list, setList, pagination, setPagination] = useListData(loadApi, {
  currentAlias,
  totalAlias,
  pageSizeAlias,
  listAlias,
  current,
  pageSize,
  total,
  mode
});
```
#### 参数
- loadApi —— 必填，请求远程数据的函数，返回值为Promise对象
- options —— 可选，传入的选项对象，如下：
  - mode —— 枚举值：add、update，默认值：update
    - add —— 累加每页数据，即请求返回结果的列表累加
    - update —— 更新每页数据，即请求返回结果的列表
  - currentAlias —— 当前页码别名，当调用返回值中的 加载函数时，其参数的当前页码对应的key名称，用于设置返回值的分页数据即当前页码 current 的值，默认值: pageNum
  - pageSizeAlias —— 每页条数别名，当调用返回值中的 加载函数时，其参数的每页条数对应的key名称，用于设置返回值的分页数据即每页条数 pageSize 的值，默认值: pageSize
  - totalAlias —— 列表总条数别名，当 loadApi 函数返回时，其返回值的 总条数 字段，用于设置返回值的分页数据即 total 的值，默认值: total
  - listAlias —— 列表别名，当 loadApi 函数返回时，其返回值的 列表 字段，用于设置返回值的列表数据即 total 的值，默认值: list
  - current —— 返回值的分页数据，当前页码的初始值，默认值：0
  - pageSize —— 返回值的分页数据，每页条数的初始值，默认值：10
  - total —— 返回值的分页数据，总条数的初始值，默认值：0

#### 返回值
类型：数组
- 下标0 —— 加载函数，封装了 loadApi 和列表、分页数据逻辑，其参数直接应用于 loadApi 函数，参数(对象)：
  - 当前页码，若上述的 options.currentAlias 未写，该 key 应为: pageNum
  - 每页条数，若上述的 options.pageSizeAlias 未写，该 key 应为: pageSize
  - 其它参数...
- 下标1 —— 列表，请求api后获得的数据
- 下标2 —— 手动设置列表数据，为 useState 返回的方法
- 下标3 —— 分页数据
- 下标4 —— 手动设置分页数据，为 useState 返回的方法





[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
