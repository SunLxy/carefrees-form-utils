import React, { useMemo, useEffect } from 'react';
import { FormInstanceBase, ValidateErrorEntity } from '@carefrees/form-utils';
import clx from 'classnames';
import { FormLayout, FormLayoutProps } from './layout';
import { useForm, FormInstanceContext, useRegisterForm } from '@carefrees/form-utils-react-hooks';
import { FormBaseStyled } from './styles';
export * from './formItem';
export * from './formList';
export * from './layout';
export * from './layout/layout.formItem';
export * from './layout/layout.body';
export * from './hooks/useResizeObserver';
export * from './hooks/attr/attr.FormItem';
export * from '@carefrees/form-utils-react-hooks';

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
  /**背景颜色*/
  bgcolor?: string;
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
    bgcolor,
    ...rest
  } = props;

  const formInstance = useForm(form);
  useRegisterForm(formInstance, name);
  const cls = useMemo(() => clx('carefrees-form', className), []);
  useMemo(() => formInstance.ctor(formData, hideData, hideRuleData), []);

  formInstance.onFinish = onFinish;
  formInstance.onValuesChange = onValuesChange;
  formInstance.onFinishFailed = onFinishFailed;

  useEffect(() => {
    if (isAutoUpdatedFormData) {
      formInstance.resetFormValues(formData);
    }
  }, [isAutoUpdatedFormData, formData]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    formInstance.submit();
  };

  return (
    <FormInstanceContext.Provider value={formInstance}>
      <FormBaseStyled $bgcolor={bgcolor} className={cls} style={style} onSubmit={onSubmit}>
        <FormLayout {...rest} className={layoutClassName} style={layoutStyle}>
          {children}
        </FormLayout>
      </FormBaseStyled>
    </FormInstanceContext.Provider>
  );
}
