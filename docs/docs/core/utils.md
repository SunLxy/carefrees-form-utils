# 工具方法

从[`lodash`](https://www.lodashjs.com/)中搬了部分需要的代码块

## get

根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。

**类型**

```ts
export declare const get: (object: Object, path: PropertyPath, defaultValue?: any) => any;
```

**案例**

```ts
const object = { 'a': [{ 'b': { 'c': 3 } }] };
 
get(object, 'a[0].b.c');
// => 3
 
get(object, ['a', '0', 'b', 'c']);
// => 3
 
get(object, 'a.b.c', 'default');
// => 'default'
```

## set

设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象

**类型**

```ts
export declare function set<T = any>(object: T, path: PropertyPath, value: any): T;
```

**案例**

```ts
const object = { 'a': [{ 'b': { 'c': 3 } }] };
 
set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// => 4
 
set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// => 5
```

## has

检查 path 是否是object对象的直接属性。

**类型**

```ts
export declare function has<T = any>(object: T, key: string | number): boolean;
```

**案例**

```ts
const object = { 'a': { 'b': 2 } };
 
has(object, 'a');
// => true
 
has(object, 'a.b');
// => true
 
has(object, ['a', 'b']);
// => true
 
```

## cloneByNamePathList

获取object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象

**类型**

```ts
export declare function cloneByNamePathList(store: Record<string, any>, namePathList: PropertyName[]): Record<string, any>;
```

**案例**

```ts
const namePathList =["name","age","address","phone"]
const object = { name: "张三", age: 18, address: "北京" };
cloneByNamePathList(object, namePathList);
// => { name: "张三", age: 18, address: "北京", phone: undefined }
```

## 基础类型

```ts
export type Many<T> = T | readonly T[];
export type PropertyName = string | number | symbol | undefined;
export type PropertyPath = Many<PropertyName>;
```
