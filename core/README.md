# 实体类

## 安装

```bash
npm install @carefrees/form-utils # yarn add @carefrees/form-utils # pnpm add @carefrees/form-utils
```

## 基础类型

```ts
export interface MessageType {
  /**信息*/
  message?: string;
  [s: string]: unknown;
}

export interface ErrorDataField {
  /**字段*/
  name: string;
  /**排序*/
  sort?: string;
  /**错误信息*/
  errors: MessageType[];
}

export interface ValidateErrorEntity<Values = any> {
  /*值*/
  values: Values;
  /**错误信息*/
  errorFields: ErrorDataField[];
}

export interface Callbacks<Values = any> {
  /**值更新触发*/
  onValuesChange?: (changedValues: any, values: Values) => void;
  /**提交保存 验证成功*/
  onFinish?: (values: Values) => void;
  /**提交保存 验证失败*/
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}
/**更新表单项操作类型*/
export type UpdatedOptType = 'restValues';

```

## FormInstanceBase 实例

```ts
import { FormListInstanceBase } from '@carefrees/form-utils/esm/instance/formListInstance';
import { FormItemInstanceBase } from '@carefrees/form-utils/esm/instance/formItemInstance';
import { FormHideItemInstanceBase } from '@carefrees/form-utils/esm/instance/formHideItemInstance';
import { ErrorDataField, ValidateErrorEntity, UpdatedOptType } from '@carefrees/form-utils/esm/interface';
/**基础实例*/
export declare class FormInstanceBase<T = any> {
    /**表单数据*/
    formData: Partial<T>;
    /**表单每一项实例*/
    formItemInstances: FormItemInstanceBase[];
    /**表单中List实例集合*/
    formListInstances: Map<string, FormListInstanceBase>;
    /**隐藏组件集合*/
    hideItemInstances: FormHideItemInstanceBase[];
    /**隐藏组件字段对应的值*/
    hideState: {};
    /**实例是否初始化*/
    isMountInstance: boolean;
    /**是否保护值(不进行表单项组件卸载重置初始值)*/
    preserve?: boolean;
    hideRuleState: Record<string, boolean>;
    /**值更新触发*/
    onValuesChange?: (changedValues: any, values: T) => void;
    /**提交保存 验证成功*/
    onFinish?: (values: T) => void;
    /**提交保存 验证失败*/
    onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;
    /**初始化*/
    ctor: (initial?: Partial<T>, hideState?: Record<string, boolean>, hideRuleState?: Record<string, boolean>) => this;
    /**
     * 重置表单数据值
     */
    resetFormValues: (initial?: Partial<T>) => this | undefined;
    /**
     * 重置字段数据值
     */
    resetFieldsValue: (initial?: Partial<T>) => this;
    /**注册一个 formIList 实例*/
    registerFormList: (name: string, itemInstance: FormListInstanceBase) => () => void;
    /**注册一个 formItem 实例*/
    registerFormItem: (itemInstance: FormItemInstanceBase) => () => void;
    /**注册一个 form hide item 实例*/
    registerFormHideItem: (hideItemInstance: FormHideItemInstanceBase) => () => void;
    /**更新字段是否隐藏*/
    updatedFieldHideValue: (value: Record<string, boolean>) => this;
    /**更新字段是否隐藏规则*/
    updatedFieldHideRulesValue: (value: Record<string, boolean>) => this;
    /**更新字段value值
     *
     * @param name 字段
     * @param value 字段值
     * @param validateType 校验规则处理
     * @param isOnlySave 仅用于存储
     *
     */
    updatedFieldValue: (name: string, value: any, validateType?: "validate" | "clear" | "none", isOnlySave?: boolean) => this | undefined;
    /**
     * 批量更新字段value值
     *
     * @param value 更新值
     * @param isTransfer 是否触发 onValuesChange 事件
     * @param isValidate 是否进行验证
     * @param isOnlySave 仅用于存储
     *
     */
    bathUpdatedFieldValue: (value: any, isTransfer?: boolean, isValidate?: boolean, isOnlySave?: boolean) => this | undefined;
    /**获取 formList 实例或者集合*/
    getFormListInstance: (name: string) => FormListInstanceBase | undefined;
    /**获取字段值*/
    getFieldValue: (name?: string) => any;
    /**获取字段隐藏规则值*/
    getFieldHideRulesValue: (name?: string) => any;
    /**获取字段隐藏值*/
    getFieldHideValue: (name?: string) => any;
    /**通知组件更新*/
    notice: (name?: string | string[], type?: UpdatedOptType) => this;
    /**通知组件隐藏*/
    noticeHide: (name?: string | string[]) => this;
    /**通知监听方法*/
    noticeWatch: (name?: string | string[]) => this;
    /**
     * 只进行验证，没有返回值
     * */
    onlyValidate: (name: string | string[]) => Promise<this>;
    /**仅用于判断是否存在不通过校验的数据*/
    onlyValidateRulesMessage: (names?: string[]) => Promise<{
        errorFields: ErrorDataField[];
    }>;
    /**规则验证 ，默认不传递验证所有 */
    validate: (names?: string[]) => Promise<T>;
    /**
     * 提交
     */
    submit: () => Promise<void>;
}

```

## FormItemBaseInstance 实例

```ts
import { FormInstanceBase } from '@carefrees/form-utils/esm/instance/formInstance';

export declare class FormItemBaseInstance {
    /**
      * 顺序
      * @example
      * "0"
      * "0-0"
      * "0-0-0"
     */
    sort?: string;
    /**
     * 字段 ，分割方式与lodash的get和set方法值更新或设置路径一致
     * @example
     * 默认："name"
     * 嵌套字段："name.a.doc"
     * 嵌套字段："name[1].a.doc"
     * 嵌套字段："name.a[2].doc"
    */
    name: string;
    /**更新当前组件方法*/
    updated?: Function;
    /**依赖更新项*/
    dependencies?: string[];
    /**是否是 watch */
    isWatch?: boolean;
    /**表单实例*/
    instance?: FormInstanceBase;
}
```

## FormItemInstanceBase 实例

```ts
import { RuleInstanceBase } from '@carefrees/form-utils/esm/instance/ruleIntsnace';
import { FormInstanceBase } from '@carefrees/form-utils/esm/instance/formInstance';
import { FormItemBaseInstance } from '@carefrees/form-utils/esm/instance/formItemBaseInstance';

export declare class FormItemInstanceBase extends FormItemBaseInstance {
    /**父级字段*/
    parentDataField?: string;
    /**通知 只用于校验规则提示 字段 */
    noticeOnlyRuleDataField?: string[];
    /**通知父级字段监听方法更新*/
    isNoticeParentField?: boolean;
    /**通知watch监听方法更新*/
    noticeWatchField?: string[];
    /**label for属性值*/
    htmlFor?: string;
    /**输入框的属性数据*/
    control?: any;
    /**规则*/
    rule?: RuleInstanceBase;
    /**是否保护值(不进行表单项组件卸载重置初始值)*/
    preserve?: boolean;
    /**触发数据更新之后触发（用于数据联动之类的）*/
    onAfterUpdate?: (value: any, instance: FormInstanceBase, instanceAttr: FormItemInstanceBase, event: any) => void;
    /**更新方法*/
    onChange?: (event: any) => void;
    /**初始化*/
    ctor: (name: string, rule?: RuleInstanceBase) => this;
}

```

## FormListInstanceBase 实例

```ts
import { FormItemBaseInstance } from '@carefrees/form-utils/esm/instance/formItemBaseInstance';
import { RuleInstanceBase } from '@carefrees/form-utils/esm/instance/ruleIntsnace';
import { FormItemInstanceBase } from '@carefrees/form-utils/esm/instance/formItemInstance';

export declare class FormListInstanceBase extends FormItemBaseInstance {
    /**规则*/
    rule?: RuleInstanceBase;
    /**表单实例*/
    formItemInstance?: FormItemInstanceBase;
    /**父级字段*/
    parentDataField?: string;
    /**记录key值*/
    keys: number[];
    /**累加数据，唯一性*/
    id: number;
    /**
     * 初始化
     * @param name 字段
    */
    ctor: (name: string) => this;
    /**获取值*/
    getLastValue: () => any[];
    /**
     * 添加一条
     * @param initialValue 初始值
     * @param unshift 是否加入数组前面
    */
    onAdd: (initialValue?: Object, unshift?: boolean) => void;
    /**
     * 删除
     * @param index 删除数据下标
    */
    onDelete: (index: number | number[]) => void;
    /**移动*/
    onMove: (from: number, to: number) => void;
    /**更新某个item数据*/
    updatedItem: (index: number, item: any) => void;
    /**获取渲染 list 字段拼接*/
    getFields: () => {
        name: number;
        key: number;
    }[];
}
```

## FormHideItemInstanceBase 实例

```ts
import { FormItemBaseInstance } from "@carefrees/form-utils/esm/instance/formItemBaseInstance";
export declare class FormHideItemInstanceBase extends FormItemBaseInstance {
    /**初始化方法*/
    ctor: (name: string) => this;
    /**上次是否隐藏值*/
    preHideValue?: boolean;
    /**更新当前组件方法*/
    updatedItem?: Function;
    /**判读更新是否隐藏还是显示*/
    updated: Function;
}

```

## MultipleInstanceBase 实例

```ts
import { FormInstanceBase } from '@carefrees/form-utils/esm/instance/formInstance';

export declare class MultipleInstanceBase {
    private instanceMap;
    /**
     * 注册表单实例
     * @param name 表单名称
     * @param form 表单实例
    */
    ctor: (name: string, form: FormInstanceBase) => () => void;
    /**
     * 获取表单实例
     * @param name 表单名称
    */
    getInstance: (name?: string) => FormInstanceBase<any> | Map<string, FormInstanceBase<any>> | undefined;
    /**
     * 验证表单规则
     * @param namePath 表单名称(如果不传递表单名称,则验证所有表单)
     *
     * @example
    */
    validate: (namePath?: string | string[] | Record<string, string[]>) => Promise<unknown>;
    /**
     * 获取表单中值
     * @param name 表单名称 (不存在时，获取所有表单值)
     * @param path 字段路径 (不存在的时候直接获取对应表单所有值)
     *
    */
    getFormFieldValue: (name?: string, dataField?: string | string[]) => {
        [x: string]: any;
    };
}

```

## RuleInstanceBase 实例

```ts
import { MessageType } from '@carefrees/form-utils/esm/interface';
import { FormInstanceBase } from '@carefrees/form-utils/esm/instance/formInstance';
import { RuleItem } from "async-validator";

export declare class RuleInstanceBase {
    /**
       * 顺序
       * @example
       * "0"
       * "0-0"
       * "0-0-0"
      */
    sort?: string;
    /**表单实例*/
    instance?: FormInstanceBase;
    /**
     * 字段 ，分割方式与lodash的get和set方法值更新或设置路径一致
     * @example
     * 默认："name"
     * 嵌套字段："name.a.doc"
     * 嵌套字段："name[1].a.doc"
     * 嵌套字段："name.a[2].doc"
    */
    name: string;
    /**规则*/
    rules?: RuleItem[];
    /**错误提示内容*/
    messages?: MessageType[] | string | undefined;
    /**更新当前组件方法*/
    updated?: Function;
    /**判断是否必填*/
    isRequired: () => boolean;
    /**初始化*/
    ctor: (name: string, rules: RuleItem[]) => this;
    /**判断是否需要验证*/
    isValidate: () => number | false;
    /**更新提示信息*/
    updatedMessages: (messages?: MessageType[] | string | undefined) => void;
    /**更新规则*/
    updatedRules: (rules: RuleItem[]) => void;
    /**验证规则
     * @param {boolean} isOnly 仅判断是否校验通过
    */
    validate: (isOnly?: boolean) => Promise<unknown>;
    /**获取校验结果*/
    getValidateResult: () => {
        tip: string | (string | undefined)[];
        isInvalid: boolean;
    };
}

```

## 工具方法

从[`lodash`](https://www.lodashjs.com/)中搬了部分需要的代码块

### get

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

### set

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

### has

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

### cloneByNamePathList

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

### 基础类型

```ts
export type Many<T> = T | readonly T[];
export type PropertyName = string | number | symbol | undefined;
export type PropertyPath = Many<PropertyName>;
```
