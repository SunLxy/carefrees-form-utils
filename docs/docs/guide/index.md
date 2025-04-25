# 介绍

用于`react`技术相关的表单组件

## 安装

### pc&h5

```bash
npm install @carefrees/form-utils-react # yarn add @carefrees/form-utils-react # pnpm add @carefrees/form-utils-react
```

### taro

```bash
npm install @carefrees/form-utils-react-taro # yarn add @carefrees/form-utils-react-taro # pnpm add @carefrees/form-utils-react-taro
```

### React-Native

```bash
npm install @carefrees/form-utils-react-native # yarn add @carefrees/form-utils-react-native # pnpm add @carefrees/form-utils-react-native
```

## 区别

`react-native`和其他的平台的区别在于：

- `react-native`不支持`display: grid`,仅使用`display: flex`进行布局
- `react-native`的`style`类型为`StyleProp<ViewStyle>`，而不是`React.CSSProperties`
- `react-native`不存在`className`,只能使用`style`进行样式的控制

## 其他

如果想自己封装需要的组件也可以使用`@carefrees/form-utils-react-hooks`或`@carefrees/form-utils`重新进行封装。
