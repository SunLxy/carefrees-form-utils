# React中使用

## 安装

```bash
npm install @carefrees/form-utils-react # yarn add @carefrees/form-utils-react # pnpm add @carefrees/form-utils-react
```

## 使用

### 基本使用

```ts
import { Form, FormItem } from '@carefrees/form-utils-react';
import React ,{ useState } from 'react';

const Demo = ()=>{
  const [formData]= useState({ name: '张三', age: 18 })
  const form = useForm();

  const onSubmit = async () =>{
      try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (<Form formData={formData} form={form} >
        <FormItem rules={[{ required: true, message: '必填' }]} name="name" label="name">
          <input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="age" label="age">
          <input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>  
        <button type="button" onClick={onSubmit}>
           验😁😝证
        </button>
  </Form>)
}

```

### 控制隐藏

### 表单字段监听

### list表单项

### 表单项之间联动校验

### 表单输入框属性联动设置

### 布局组件

## 类型

### Form表单

```ts
import React from 'react';
import { FormInstanceBase, ValidateErrorEntity } from '@carefrees/form-utils';
import { FormLayoutProps } from '@carefrees/form-utils-react/esm/layout';

export interface FormProps<T = any> extends FormLayoutProps {
    children?: React.ReactNode;
    form?: FormInstanceBase;
    style?: React.CSSProperties;
    className?: string;
    layoutClassName?: string;
    layoutStyle?: React.CSSProperties;
    /**表单数据*/
    formData?: any;
    /**值更新触发*/
    onValuesChange?: (changedValues: Partial<T>, values: T) => void;
    /**提交保存 验证成功*/
    onFinish?: (values: T) => void;
    /**提交保存 验证失败*/
    onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;
    /**隐藏表单项初始值*/
    hideData?: Record<string, boolean>;
    /**表单名称*/
    name?: string;
    /**隐藏规则校验*/
    hideRuleData?: Record<string, boolean>;
    /**自动重置更新formData数据*/
    isAutoUpdatedFormData?: boolean;
}
export declare function Form<T = any>(props: FormProps<T>): import("react/jsx-runtime").JSX.Element;

```

### FormItem表单项

```ts
import { LayoutFormItemProps } from '@carefrees/form-utils-react/esm/layout/layout.formItem';
import { FormItemAttrOptions } from '@carefrees/form-utils-react/esm/hooks/attr/attr.FormItem';
import React from 'react';
export interface FormItemProps extends FormItemAttrOptions, LayoutFormItemProps {
    /**不进行样式渲染*/
    noStyle?: boolean;
}
/**表单项*/
export declare const FormItem: React.MemoExoticComponent<(props: Partial<FormItemProps>) => import("react/jsx-runtime").JSX.Element>;
/**隐藏表单项*/
export declare const FormHideItem: React.MemoExoticComponent<(props: FormItemProps) => import("react/jsx-runtime").JSX.Element>;

```

### FormList表单List

```ts
import { RuleInstanceBase, FormItemInstanceBase, FormListInstanceBase } from '@carefrees/form-utils';
import React from 'react';
import { RegisterFormListOptions } from '@carefrees/form-utils-react-hooks';
export interface FormListChildrenProps {
    /**数据集合*/
    fields: {
        name: number;
        key: number;
    }[];
    /**添加*/
    onAdd: (initialValue?: Object) => void;
    /**删除*/
    onDelete: (index: number | number[]) => void;
    /**移动*/
    onMove: (from: number, to: number) => void;
}
export interface FormListProps extends RegisterFormListOptions {
    children: (options: FormListChildrenProps, instances: {
        ruleInstance: RuleInstanceBase;
        formItemInstance: FormItemInstanceBase;
        formListInstance: FormListInstanceBase;
    }) => React.ReactNode;
}
/**form list 组件*/
export declare const FormList: React.MemoExoticComponent<(props: FormListProps) => import("react/jsx-runtime").JSX.Element>;
/**隐藏 form list item 组件*/
export declare const FormHideList: React.MemoExoticComponent<(props: FormListProps) => import("react/jsx-runtime").JSX.Element>;

```

### 布局组件 类型

```ts
import React from 'react';
import { AttrsOptions } from '@carefrees/form-utils-react-hooks';
import { FormLayoutBodyProps } from '@carefrees/form-utils-react/esm/layout/layout.body';
export interface FormLayoutProps extends AttrsOptions, FormLayoutBodyProps {
    /**标题*/
    title?: React.ReactNode;
    /**额外内容*/
    extra?: React.ReactNode;
    /**内容*/
    children?: React.ReactNode;
    /**是否占据整行*/
    isAllColSpan?: boolean;
    className?: string;
    /**头部ClassName*/
    headerClassName?: string;
    /**内容ClassName*/
    bodyClassName?: string;
    style?: React.CSSProperties;
    /**头部样式*/
    headerStyle?: React.CSSProperties;
    /**内容样式*/
    bodyStyle?: React.CSSProperties;
    /**是否添加边框*/
    bordered?: boolean;
}
/**布局组件*/
export declare const FormLayout: React.MemoExoticComponent<(props: FormLayoutProps) => import("react/jsx-runtime").JSX.Element>;
export interface FormLayoutRowsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}
/**布局组件 占据一整行*/
export declare const FormLayoutRows: React.ForwardRefExoticComponent<Omit<FormLayoutRowsProps, "ref"> & React.RefAttributes<HTMLDivElement>>;

```

### 布局组件内容 类型

```ts
import React from 'react';
import { SizeInfo } from '@carefrees/form-utils-react/esm/hooks/useResizeObserver';
export interface FormLayoutBodyProps {
    className?: string;
    style?: React.CSSProperties;
    /**列数据*/
    colCount?: number;
    /**
     * @description gap 属性是用来设置网格行与列之间的间隙，该属性是row-gap and column-gap的简写形式。
     */
    gap?: string | number;
    /**
     * 获取多少行
     */
    onGapRow?: (row: number, col: number, target: HTMLDivElement) => void;
    /**内容大小变化*/
    onResize?: (size: SizeInfo, target: HTMLDivElement) => void;
    /**内容*/
    children?: React.ReactNode;
}
/**布局组件-内容区域*/
export declare const FormLayoutBody: React.MemoExoticComponent<(props: FormLayoutBodyProps) => import("react/jsx-runtime").JSX.Element>;
```

### 表单项布局组件类型

```ts
import React from 'react';
export interface LayoutFormItemProps {
    /**规则校验失败错误提示位置*/
    errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
    /**必填样式*/
    required?: boolean;
    /**label显示模式*/
    labelMode?: 'left' | 'top' | 'between' | 'hide';
    /**内容*/
    children?: React.ReactNode;
    /**只进行规则样式*/
    onlyRuleStyle?: boolean;
    label?: React.ReactNode;
    /**底部提示内容*/
    helpText?: React.ReactNode;
    /**额外内容*/
    extra?: React.ReactNode;
    /**是否显示label后的冒号*/
    showColon?: boolean;
    /**
     * 表单项占据列数
     * @default 1
     */
    colSpan?: number;
    /**
     * 表单项占据行数
     * @default 1
     */
    rowSpan?: number;
    htmlFor?: string;
    /**规则验证结果*/
    validateResult?: {
        tip: string | (string | undefined)[];
        isInvalid: boolean;
    };
    style?: React.CSSProperties;
    className?: string;
    labelStyle?: React.CSSProperties;
    labelClassName?: string;
}
/**布局组件 表单项*/
export declare const LayoutFormItem: React.MemoExoticComponent<(props: LayoutFormItemProps) => import("react/jsx-runtime").JSX.Element>;
```
