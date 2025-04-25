# React Native

## 安装

```bash
npm install @carefrees/form-utils-react-native # yarn add @carefrees/form-utils-react-native # pnpm add @carefrees/form-utils-react-native
```

## 使用

### 基本使用

```ts
import { Form, FormItem } from '@carefrees/form-utils-react-native';
import React, { useState } from 'react';
import { View, Button, Input } from 'react-native';

const Demo = () => {
  const [formData] = useState({ name: '张三', age: 18 });
  const form = useForm();

  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form formData={formData} form={form}>
      <FormItem rules={[{ required: true, message: '必填' }]} name="name" label="name">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem name="age" label="age">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <Button onPress={onSubmit} title="验证" color="#841584" />
    </Form>
  );
};
```

### 控制隐藏

```ts
import { Form, FormItem, FormHideItem } from '@carefrees/form-utils-react-native';
import React, { useState } from 'react';
import { View, Button, Input } from 'react-native';

const Demo = () => {
  const [formData] = useState({ name: '张三', age: 18 });
  const form = useForm();

  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onValuesChange = (item: any) => {
    console.log('item', item);
    if (Reflect.has(item, 'age')) {
      if (item.age === '18') {
        form.updatedFieldHideValue({ address: false });
      } else {
        form.updatedFieldHideValue({ address: true });
      }
    }
  };

  return (
    <Form formData={formData} form={form} onValuesChange={onValuesChange} hideData={{ address: true }}>
      <FormItem rules={[{ required: true, message: '必填' }]} name="name" label="name">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem name="age" label="age">
        <Input style={{ width: '100%' }} placeholder="请输入18,显示address表单项" />
      </FormItem>
      <FormHideItem name="address" label="address">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormHideItem>
      <Button onPress={onSubmit} title="验证" color="#841584" />
    </Form>
  );
};
```

### 表单字段监听

```ts
import { Form, FormItem, useWatch } from '@carefrees/form-utils-react-native';
import React, { useState } from 'react';
import { View, Button, Input ,Text} from 'react-native';

// 子节点
const Child = () => {
  // 第一次监听可以获取到值
  const [value] = useWatch('name');
  return <View><Text>name值：{value}</Text></View>;
};

const Demo = () => {
  const [formData] = useState({ name: '张三', age: 18 });
  const form = useForm();

  // 在表单包裹内,第一次监听获取不到值
  const [age] = useWatch('age', form);
  console.log(age);

  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form formData={formData} form={form}>
      <FormItem rules={[{ required: true, message: '必填' }]} name="name" label="name">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem name="age" label="age">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <Child />
      <Button onPress={onSubmit} title="验证" color="#841584" />
    </Form>
  );
};
```

### list 表单项

```tsx
import { Form, FormItem, useWatch, useForm, FormList, FormLayoutRows, FormLayout } from '@carefrees/form-utils-react-native';
import React, { useState } from 'react';
import { View, Button, Input ,Text} from 'react-native';

// 子节点
const Child = () => {
  // 第一次监听可以获取到值
  const [value] = useWatch('list');
  return <View><Text>list值：{JSON.stringify(value)}</Text></View>;
};

const Demo = () => {
  const [formData] = useState({
    name: '张三',
    age: 18,
    list: [{ name: '张三' }, { name: '李四' }],
  });
  const form = useForm();

  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form formData={formData} form={form}>
      <FormItem rules={[{ required: true, message: '必填' }]} name="name" label="name">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem name="age" label="age">
        <Input style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormLayoutRows>
        <FormList name="list">
          {(options) => {
            const fields = options.fields;
            return (
              <View>
                <Button onPress={() => options.onAdd({})} title="添加一项数据" color="#841584" />
                {fields.map((item, index) => {
                  return (
                    <FormLayout key={item.key}>
                      <FormItem name={`[${item.name}].name`} label="子项name">
                        <Input style={{ width: '100%' }} placeholder="请输入" />
                      </FormItem>
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: 8,
                        }}
                      >
                       <Button onPress={() => options.onDelete(index)} title="删除数据" color="#841584" />
                      </View>
                    </FormLayout>
                  );
                })}
              </View>
            );
          }}
        </FormList>
      </FormLayoutRows>
      <FormLayoutRows>
        <Child />
        <View style={{ display: 'flex', alignItems: 'flex-end', padding: 8 }}>
          <Button onPress={onSubmit} title="验证" color="#841584" />
        </View>
      </FormLayoutRows>
    </Form>
  );
};
export default Demo;
```

### 表单项依赖更新(dependencies 参数)

```tsx
import { Form, FormItem, useWatch, useForm, FormLayoutRows, useFormInstance } from '@carefrees/form-utils-react-native';
import React, { useState, useMemo } from 'react';
import { View, Button, Input } from 'react-native';

// 子节点
const ChildInput = () => {
  const form = useFormInstance();
  const a = form.getFieldValue('a');
  const b = form.getFieldValue('b');
  const value = useMemo(() => {
    if (a && b) {
      return a * b;
    }
    return 0;
  }, [a, b]);
  // 第一次监听可以获取到值
  return <Input placeholder="请输入a和b" disabled value={value} />;
};

const Demo = () => {
  const [formData] = useState({ a: 0, b: 0 });
  const form = useForm();

  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form formData={formData} form={form}>
      <FormItem name="a" label="a">
        <Input type="number" style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem name="b" label="b">
        <Input type="number" style={{ width: '100%' }} placeholder="请输入" />
      </FormItem>
      <FormItem dependencies={['a', 'b']} name="c" label="c">
        <ChildInput />
      </FormItem>
      <FormLayoutRows>
        <View style={{ display: 'flex', alignItems: 'flex-end', padding: 8 }}>
          <Button onPress={onSubmit} title="验证" color="#841584" />
        </View>
      </FormLayoutRows>
    </Form>
  );
};
export default Demo;
```

### 布局组件

```tsx
import {
  Form,
  FormItem,
  useWatch,
  useForm,
  FormLayoutRows,
  useFormInstance,
  FormLayout,
} from '@carefrees/form-utils-react-native';
import React, { useState, useMemo } from 'react';
import { View, Button, Input } from 'react-native';

const Demo = () => {
  const [formData] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
    h: '',
    j: '',
    k: '',
    l: '',
    m: '',
    address: '',
  });
  const form = useForm();

  const onSubmit = async () => {
    try {
      console.log(form);
      const result = await form.validate();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form gap={14} colCount={2} formData={formData} form={form}>
      <FormLayout formItemLabelStyle={{ width: 60 }} isAllColSpan labelMode="left" bordered title="标题1">
        <FormItem rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
          <Input style={{ width: '100%' }} placeholder="请输入18,显示address表单项" />
        </FormItem>
        <FormItem name="address" label="address">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
      </FormLayout>
      <FormLayout
        isAllColSpan
        labelMode="top"
        bordered
        title="标题2"
      >
        <FormItem colSpan={2} rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem rules={[{ required: true, message: '必填' }]} name="b" label="测试2">
          <Input style={{ width: '100%', height: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="c" label="测试3">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="d" label="测试4">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="e" label="测试5">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="f" label="测试6">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="g" label="测试7">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="h" label="测试8">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="j" label="测试9">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="k" label="测试10">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <View>
          <Button onPress={onSubmit} title="验证" color="#841584" />
        </View>
      </FormLayout>
      <FormLayout isAllColSpan labelMode="top" title="标题2">
        <FormItem rules={[{ required: true, message: '必填' }]} name="a" label="测试1">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
        <FormItem name="address" label="address">
          <Input style={{ width: '100%' }} placeholder="请输入" />
        </FormItem>
      </FormLayout>
    </Form>
  );
};
export default Demo;
```

## 类型

### Form 表单

```ts
import React from 'react';
import { FormInstanceBase, ValidateErrorEntity } from '@carefrees/form-utils';
import { FormLayoutProps } from '@carefrees/form-utils-react-native-taro/esm/layout';
export interface FormProps<T = any> extends FormLayoutProps {
  children?: React.ReactNode;
  form?: FormInstanceBase;
  style?: React.CSSProperties;
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
export declare function Form<T = any>(props: FormProps<T>): import('react/jsx-runtime').JSX.Element;
```

### FormItem 表单项

```ts
import { LayoutFormItemProps } from '@carefrees/form-utils-react-native-taro/esm/layout/layout.formItem';
import { FormItemAttrOptions } from '@carefrees/form-utils-react-native-taro/esm/hooks/attr/attr.FormItem';
export interface FormItemProps extends FormItemAttrOptions, LayoutFormItemProps {
  /**不进行样式渲染*/
  noStyle?: boolean;
}
/**表单项*/
export declare const FormItem: import('react').MemoExoticComponent<
  (props: Partial<FormItemProps>) => import('react/jsx-runtime').JSX.Element
>;
/**隐藏表单项*/
export declare const FormHideItem: import('react').MemoExoticComponent<
  (props: FormItemProps) => import('react/jsx-runtime').JSX.Element
>;
```

### FormList 表单 List

```ts
import { RuleInstanceBase, FormItemInstanceBase, FormListInstanceBase } from '@carefrees/form-utils';
import React from 'react';
import { RegisterFormListOptions } from '@carefrees/form-utils-react-native-hooks';
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
  children: (
    options: FormListChildrenProps,
    instances: {
      ruleInstance: RuleInstanceBase;
      formItemInstance: FormItemInstanceBase;
      formListInstance: FormListInstanceBase;
    },
  ) => React.ReactNode;
}
/**form list 组件*/
export declare const FormList: React.MemoExoticComponent<
  (props: FormListProps) => import('react/jsx-runtime').JSX.Element
>;
/**隐藏 form list item 组件*/
export declare const FormHideList: React.MemoExoticComponent<
  (props: FormListProps) => import('react/jsx-runtime').JSX.Element
>;
```

### 布局组件 类型

```ts
import React from 'react';
import { ViewProps } from 'react-native';
import { AttrsOptions } from '@carefrees/form-utils-react-native-hooks';
export interface FormLayoutProps extends AttrsOptions {
  /**标题*/
  title?: React.ReactNode;
  /**额外内容*/
  extra?: React.ReactNode;
  /**内容*/
  children?: React.ReactNode;
  /**是否占据整行*/
  isAllColSpan?: boolean;
  style?: React.CSSProperties;
  /**头部样式*/
  headerStyle?: React.CSSProperties;
  /**内容样式*/
  bodyStyle?: React.CSSProperties;
  /**是否添加边框*/
  bordered?: boolean;
  /**列数据*/
  colCount?: number;
  /**
   * @description gap 属性是用来设置网格行与列之间的间隙，该属性是row-gap and column-gap的简写形式。
   */
  gap?: string | number;
}
/**布局组件*/
export declare const FormLayout: React.MemoExoticComponent<
  (props: FormLayoutProps) => import('react/jsx-runtime').JSX.Element
>;
/**布局组件 占据一整行*/
export declare const FormLayoutRows: (props: ViewProps) => import('react/jsx-runtime').JSX.Element;
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
  htmlFor?: string;
  /**规则验证结果*/
  validateResult?: {
    tip: string | (string | undefined)[];
    isInvalid: boolean;
  };
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  /**底部边框*/
  inputBordered?: boolean;
}
/**布局组件 表单项*/
export declare const LayoutFormItem: React.MemoExoticComponent<
  (props: LayoutFormItemProps) => import('react/jsx-runtime').JSX.Element
>;
```

### 表单项参数

```ts
import { RuleInstanceBase, FormInstanceBase, FormItemInstanceBase } from '@carefrees/form-utils';
import { RegisterFormItemOptions } from '@carefrees/form-utils-react-hooks';
import React from 'react';
export interface FormItemAttrOptions extends RegisterFormItemOptions {
    /**依赖更新项*/
    dependencies?: string[];
    /**通知 只用于校验规则提示 字段 */
    noticeOnlyRuleDataField?: string[];
    /**通知父级字段监听方法更新*/
    isNoticeParentField?: boolean;
    /**通知watch监听方法更新*/
    noticeWatchField?: string[];
    /**是否保护值(不进行表单项组件卸载重置初始值)*/
    preserve?: boolean;
    /**重写规则*/
    useRules?: (ruleInstance: RuleInstanceBase, form: FormInstanceBase, formItemInstance: FormItemInstanceBase) => void;
    /**输入框属性重写*/
    useAttrs?: (attrs: any, form: FormInstanceBase, formItemInstance: FormItemInstanceBase) => any;
    /**输入框属性*/
    attrs?: any;
    /**传递组件字段*/
    valuePropName?: string;
    /**取值字段(默认text)*/
    getValuePath?: string;
    /**自定义获取值*/
    getValueFromEvent?: (event: any, form: FormInstanceBase, formItemInstance: FormItemInstanceBase) => any;
    /**值格式化*/
    formatValue?: (value: any, form: FormInstanceBase, formItemInstance: FormItemInstanceBase, event: any) => any;
    /**触发数据更新之后触发（用于数据联动之类的）*/
    onAfterUpdate?: (value: any, form: FormInstanceBase, formItemInstance: FormItemInstanceBase, event: any) => void;
    /**事件名称*/
    trigger?: string;
    /**子元素*/
    children?: React.ReactNode;
}
/**表单项参数*/
export declare const useFormItemAttr: (options: FormItemAttrOptions) => {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>;
    form: FormInstanceBase<any>;
    formItemInstance: FormItemInstanceBase;
    ruleInstance: RuleInstanceBase;
    onChange: (event: any) => void;
    htmlFor: string;
    validateResult: {
        tip: string | (string | undefined)[];
        isInvalid: boolean;
    };
};
```

### 公共参数类型

```ts
import { ViewProps } from 'react-native';
export interface AttrsOptions {
    /**列数据*/
    colCount?: number;
    /**规则校验失败错误提示位置*/
    errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
    /**
     * label显示模式
     * @platform taro 支持 between
     */
    labelMode?: 'left' | 'top' | 'between' | 'hide';
    /**是否显示label后的冒号*/
    showColon?: boolean;
    /**表单项 style*/
    formItemStyle?: ViewProps['style'];
    /**表单项 label  style*/
    formItemLabelStyle?: ViewProps['style'];
    /**
     * 输入框底部边框
     * @platform taro
     */
    inputBordered?: boolean;
}
/**公共属性 Context */
export declare const AttrsContext: import("react").Context<AttrsOptions>;
/**子项中获取公共属性*/
export declare const useAttrs: () => AttrsOptions;

```
