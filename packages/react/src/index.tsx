import { useMemo, useEffect } from "react"
import { FormInstanceBase, ValidateErrorEntity } from "@carefrees/form-utils"
import clx from 'classnames';
import { FormLayout, FormLayoutProps } from "./layout"
import { useForm, FormInstanceContext } from "./hooks/useForm"
import { FormBaseStyled } from "./styles"
import { useRegisterForm } from "./hooks/register/register.form"
export * from "./formItem"
export * from "./formList"
export * from "./layout"
export * from "./layout/layout.formItem"
export * from "./hooks/useAttrs"
export * from "./hooks/useForm"
export * from "./hooks/useFormItem"
export * from "./hooks/useFormItemParentName"
export * from "./hooks/useFormList"
export * from "./hooks/useHtmlFor"
export * from "./hooks/useMultipleForm"
export * from "./hooks/useWatch"
export * from "./hooks/attr/attr.FormItem"
export * from "./hooks/register/register.FormHideItem"
export * from "./hooks/register/register.FormItem"
export * from "./hooks/register/register.FormList"
export * from "./hooks/register/register.form"

export interface FormProps<T = any> extends Omit<FormLayoutProps, 'title' | 'extra'> {
  children?: React.ReactNode
  form?: FormInstanceBase
  style?: React.CSSProperties
  className?: string
  layoutClassName?: string
  layoutStyle?: React.CSSProperties
  /**表单数据*/
  formData?: any
  /**值更新触发*/
  onValuesChange?: (changedValues: Partial<T>, values: T) => void;
  /**提交保存 验证成功*/
  onFinish?: (values: T) => void;
  /**提交保存 验证失败*/
  onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;
  /**隐藏表单项初始值*/
  hideData?: Record<string, boolean>
  /**表单名称*/
  name?: string
  /**隐藏规则校验*/
  hideRuleData?: Record<string, boolean>
  /**自动重置更新formData数据*/
  isAutoUpdatedFormData?: boolean
}

export const Form = (props: FormProps) => {
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
  } = props

  const formInstance = useForm(form)
  useRegisterForm(formInstance, name)
  const cls = clx('carefrees-form', className)
  useMemo(() => formInstance.ctor(formData, hideData, hideRuleData), []);

  useEffect(() => {
    if (isAutoUpdatedFormData) {
      formInstance.resetFieldValue(formData)
    }
  }, [isAutoUpdatedFormData, formData])

  formInstance.setCallbacks({ onFinish, onFinishFailed, onValuesChange });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    formInstance.submit()
  }

  return <FormInstanceContext.Provider value={formInstance}>
    <FormBaseStyled className={cls} style={style} onSubmit={onSubmit} >
      <FormLayout {...rest} className={layoutClassName} style={layoutStyle} >
        {children}
      </FormLayout>
    </FormBaseStyled>
  </FormInstanceContext.Provider>
}
