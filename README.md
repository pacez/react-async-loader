

# react-component-async-loader

The React component asynchronous loader

REACT组件异步加载器


  * 注意事项： 
  1. 异步加载一个组件时，需要判断当前项目中是否该组件都为异步加载，若同一个项目中其他地方有使用该组件，未异步加载。 将致导异步加载失效。
  1. 静默处理异常，加载失败，对应的组件不会出现，不进行消息提醒。
  1. 该方法会在组件挂载时加载资源，如果要做到按需加载，注意组件的挂载时机。

### 功能
1. 支持异步加载export default的组件
2. 支持异步加载export 的react组件 


### 安装

```shell
npm i react-component-async-loader
```

### API

#### asyncComponent
适用于加载export default的React组件

| Arguments       | Type                                        | Desc                              | Required |
| --------------- | :------------------------------------------ | --------------------------------- | -------- |
| importComponent | () => import（componentName/componentpath） | import 需要加载的组件             | true     |
| Loading         | React Component                             | 用于异步加载状态展示的loading组件 | false    |

#### asyncMoudleComponent
适用于加载单个export的React组件

| Arguments       | Type                                        | Desc                                    | Required |
| --------------- | :------------------------------------------ | --------------------------------------- | -------- |
| key             | string                                      | 通过指定key，加载单个export 的React组件 | true     |
| importComponent | () => import（componentName/componentpath） | import 需要加载的组件                   | true     |
| Loading         | REACT Component，                           | 用于异步加载状态展示的loading组件       | false    |

#### asyncMoudleComponents
适用于加载多个export的React组件

| Arguments       | Type                                        | Desc                                          | Required |
| --------------- | :------------------------------------------ | --------------------------------------------- | -------- |
| keys            | Array[string]                               | 通过指定keys[key]，加载多个export 的React组件 | true     |
| importComponent | () => import（componentName/componentpath） | import 需要加载的组件                         | true     |
| Loading         | REACT Component，                           | 用于异步加载状态展示的loading组件             | false    |



### 示例

```javascript
import asyncComponent, { asyncMoudleComponent,asyncMoudleComponents } from "react-component-async-loader";

// 加载npm default组件, 支持传入Loading组件
const CoverTool = asyncComponent(() => import("cover-tool"));

// 加载本地 default组件, 支持传入Loading组件
const Component = asyncComponent(() => import("./component"));

// 加载单个npm module组件, 本地module组件依此类推, 支持传入Loading组件
const ImportTraineeModal = asyncMoudleComponent("ImportTraineeModal", () => import("ice"));

// 同一个组件库加载多个npm module组件, 本地module组件依此类推, 支持传入Loading组件
const { C1, C2 } = asyncMoudleComponents(['C1','C2'], () => import("ice"));
```
