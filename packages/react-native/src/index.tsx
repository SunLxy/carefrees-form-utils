import React, { useMemo, useEffect } from 'react';
import { FormInstanceBase, ValidateErrorEntity } from '@carefrees/form-utils';
import { FormLayout, FormLayoutProps } from './layout';
import { ViewProps, View } from 'react-native';
import { useRegisterForm, useForm, FormInstanceContext } from '@carefrees/form-utils-react-hooks';
export * from './formItem';
export * from './formList';
export * from './layout';
export * from './layout/layout.formItem';
export * from './hooks/attr/attr.FormItem';
export * from '@carefrees/form-utils-react-hooks';
export { useAttrs, AttrsOptions, AttrsContext } from './hooks/useAttrs';

export interface FormProps<T = any> extends FormLayoutProps {
  children?: React.ReactNode;
  form?: FormInstanceBase;
  style?: ViewProps['style'];
  className?: string;
  layoutClassName?: string;
  layoutStyle?: ViewProps['style'];
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

export function Form<T = any>(props: FormProps<T>) {
  const {
    children,
    form,
    style,
    className,
    formData,
    hideData,
    hideRuleData,
    isAutoUpdatedFormData = false,
    name,
    onFinish,
    onFinishFailed,
    onValuesChange,
    layoutStyle,
    layoutClassName,
    ...rest
  } = props;
  const formInstance = useForm(form);
  useRegisterForm(formInstance, name);
  useMemo(() => formInstance.ctor(formData, hideData, hideRuleData), []);

  formInstance.onFinish = onFinish;
  formInstance.onValuesChange = onValuesChange;
  formInstance.onFinishFailed = onFinishFailed;

  useEffect(() => {
    if (isAutoUpdatedFormData) {
      formInstance.resetFormValues(formData);
    }
  }, [isAutoUpdatedFormData, formData]);

  return (
    <FormInstanceContext.Provider value={formInstance}>
      <View style={style}>
        <FormLayout {...rest} className={layoutClassName} style={layoutStyle}>
          {children}
        </FormLayout>
      </View>
    </FormInstanceContext.Provider>
  );
}
