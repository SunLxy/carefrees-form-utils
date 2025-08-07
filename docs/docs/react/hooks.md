# 公共hooks

`react`中公共使用hooks

## 安装

```bash
npm install @carefrees/form-utils-react-hooks # yarn add @carefrees/form-utils-react-hooks # pnpm add @carefrees/form-utils-react-hooks
```

## Form表单

- useForm: 初始化表单实例
- useFormInstance: 子项中获取表单实例
- useFormItem: 初始化表单项实例
- useFormItemInstance: 子项中获取表单项实例
- useFormList: 初始化表单List实例
- useFormListInstance: 子项中获取表单List实例
- useMultipleForm: 初始化 多表单收集 实例
- useMultipleFormInstance: 子项中获取 多表单收集 实例
- useWatch: 监听表单某个值变化
- useAttrs: 获取布局公共属性
- useFormItemParentName: 获取表单父级name
- useHtmlFor: 生成label标签的for属性

### 注册

- useRegisterForm: 注册表单实例到多表单收集实例中
- useRegisterFormHideItem: 注册表单隐藏表单项到表单实例中
- useRegisterFormItem: 注册表单项到表单实例中
- useRegisterFormList: 注册表单List到表单实例中

### Context

- FormInstanceContext: 表单实例
- FormItemInstanceContext: 表单项实例
- FormListInstanceContext: 表单List实例
- MultipleFormInstanceContext: 多表单收集实例
- FormItemParentNameContext: 表单父级name
- AttrsContext: 布局公共属性

### Provider

- MultipleFormProvider: 多表单收集 Provider

## 类型

### useForm

初始化表单实例

```ts
import { FormInstanceBase } from '@carefrees/form-utils';
/**表单实例 Context */
export declare const FormInstanceContext: import("react").Context<FormInstanceBase<any>>;
/**子项中获取表单实例*/
export declare function useFormInstance<T = any>(): FormInstanceBase<T>;
/**初始化表单实例*/
export declare function useForm<T = any>(form?: FormInstanceBase<T>): FormInstanceBase<T>;
```

### useFormItem

初始化表单项实例

```ts
import { FormItemInstanceBase } from '@carefrees/form-utils';
/**表单项实例 Context */
export declare const FormItemInstanceContext: import("react").Context<FormItemInstanceBase>;
/**子项中获取表单项实例*/
export declare const useFormItemInstance: () => FormItemInstanceBase;
/**s初始化 表单项实例*/
export declare const useFormItem: (formItem?: FormItemInstanceBase) => FormItemInstanceBase;
```

### useFormList

初始化表单List实例

```ts
import { FormListInstanceBase } from '@carefrees/form-utils';
/**表单List实例 Context */
export declare const FormListInstanceContext: import("react").Context<FormListInstanceBase>;
/**子项中获取表单List实例*/
export declare const useFormListInstance: () => FormListInstanceBase;
/**初始化 表单List实例*/
export declare const useFormList: (formList?: FormListInstanceBase) => FormListInstanceBase;

```

### useMultipleForm

初始化 多表单收集 实例

```ts
import { MultipleInstanceBase } from '@carefrees/form-utils';
/**多表单收集 Context */
export declare const MultipleFormInstanceContext: import("react").Context<MultipleInstanceBase>;
/**子项中获取 多表单收集 实例*/
export declare const useMultipleFormInstance: () => MultipleInstanceBase;
/**初始化 多表单收集 实例*/
export declare const useMultipleForm: (multipleForm?: MultipleInstanceBase) => MultipleInstanceBase;
export interface MultipleFormProviderProps {
    children: React.ReactNode;
    multipleForm?: MultipleInstanceBase;
}
/**多表单收集 Provider */
export declare const MultipleFormProvider: (props: MultipleFormProviderProps) => import("react").FunctionComponentElement<import("react").ProviderProps<MultipleInstanceBase>>;
```

### useWatch

监听表单某个值变化

```ts
import { FormInstanceBase } from '@carefrees/form-utils';
export declare class WatchInstanceBase {
    /**监听字段*/
    name: string;
    /**表单实例*/
    form: FormInstanceBase;
    /**老值*/
    oldValue: any;
    /**更新值*/
    dispatch: (value: any) => void;
    /**回调*/
    callBack?: (value: any, form: FormInstanceBase) => void;
    /**更新*/
    updated: () => void;
}
/**
 * 字段监听
 */
export declare const useWatch: (name: string, form: FormInstanceBase, callBack?: (value: any, form: FormInstanceBase) => void) => [any, FormInstanceBase, WatchInstanceBase];

```

### useAttrs(pc、h5、taro)

获取布局公共属性,在react-native中移除了className属性

```ts
export interface AttrsOptions {
    /**列数据*/
    colCount?: number;
    /**规则校验失败错误提示位置*/
    errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
    /**
     * label显示模式
     * @platform taro、react-native 支持 between
     */
    labelMode?: 'left' | 'top' | 'between' | 'hide';
    /**是否显示label后的冒号*/
    showColon?: boolean;
    /**表单项 className*/
    formItemClassName?: string;
    /**表单项 style*/
    formItemStyle?: React.CSSProperties;
    /**表单项 label  className*/
    formItemLabelClassName?: string;
    /**表单项 label  style*/
    formItemLabelStyle?: React.CSSProperties;
    /**
     * 输入框底部边框
     * @platform taro、react-native
     */
    inputBordered?: boolean;
}
/**公共属性 Context */
export declare const AttrsContext: import("react").Context<AttrsOptions>;
/**子项中获取公共属性*/
export declare const useAttrs: () => AttrsOptions;
```

### useFormItemParentName

获取表单父级name

```ts
export declare const FormItemParentNameContext: import("react").Context<{
    name: string;
    sort: string;
}>;
export interface FormItemParentNamOptions {
    /**字段*/
    name: string;
    /**排序*/
    sort?: string;
    /**是否拼接父级字段*/
    isJoinParentField?: boolean;
}
interface FormItemParentNameProviderProps extends Omit<FormItemParentNamOptions, 'isJoinParentField'> {
    children?: React.ReactNode;
}
export declare const FormItemParentNameProvider: (props: FormItemParentNameProviderProps) => import("react").FunctionComponentElement<import("react").ProviderProps<{
    name: string;
    sort: string;
}>>;
/**表单项获取父级字段*/
export declare const useFormItemParentName: (options: FormItemParentNamOptions) => {
    newName: string;
    newSort: string;
    parentItem: {
        name: string;
        sort: string;
    };
    parentName: string;
};
```

### useHtmlFor

生成label标签的for属性

```ts
export declare const useHtmlFor: (suffix: string) => string;
```

### useRegisterForm

注册表单实例到多表单收集实例中

```ts
import { FormInstanceBase } from '@carefrees/form-utils';
/**注册表单实例到多表单收集实例中*/
export declare const useRegisterForm: (form: FormInstanceBase, name?: string) => import("@carefrees/form-utils").MultipleInstanceBase;

```

### useRegisterFormHideItem

注册表单隐藏表单项到表单实例中

```ts
import { RegisterFormItemOptions } from './register.FormItem';
interface RegisterFormHideItemOptions extends Omit<RegisterFormItemOptions, 'rules'> {
}
/**注册表单隐藏表单项到表单实例中*/
export declare const useRegisterFormHideItem: (options: RegisterFormHideItemOptions) => {
    form: import("@carefrees/form-utils").FormInstanceBase<any>;
    isHide: any;
};
```

### useRegisterFormItem

注册表单项到表单实例中

```ts
/**
 * @description 注册组件
 */
import { RuleInstanceBase } from '@carefrees/form-utils';
import type { RuleItem } from 'async-validator';
export interface RegisterFormItemOptions {
    /**字段*/
    name: string;
    /**规则*/
    rules?: RuleItem[];
    /**排序值*/
    sort?: string;
    /**是否拼接父级字段*/
    isJoinParentField?: boolean;
}
/**注册表单项到表单实例中*/
export declare const useRegisterFormItem: (options: RegisterFormItemOptions) => {
    ruleInstance: RuleInstanceBase;
    formItemInstance: import("@carefrees/form-utils").FormItemInstanceBase;
    form: import("@carefrees/form-utils").FormInstanceBase<any>;
    parentName: string;
    newName: string;
};
```

### useRegisterFormList

注册表单List到表单实例中

```ts
import { RegisterFormItemOptions } from './register.FormItem';
export interface RegisterFormListOptions extends RegisterFormItemOptions {
}
/**注册表单List到表单实例中*/
export declare const useRegisterFormList: (options: RegisterFormListOptions) => {
    ruleInstance: import("@carefrees/form-utils").RuleInstanceBase;
    formItemInstance: import("@carefrees/form-utils").FormItemInstanceBase;
    formListInstance: import("@carefrees/form-utils").FormListInstanceBase;
};

```
