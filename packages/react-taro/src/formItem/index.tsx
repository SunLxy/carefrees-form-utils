import { LayoutFormItem, LayoutFormItemProps } from '../layout/layout.formItem';
import { useFormItemAttr, FormItemAttrOptions } from '../hooks/attr/attr.FormItem';
import { Fragment, memo } from 'react';
import { useRegisterFormHideItem, FormItemParentNameProvider } from '@carefrees/form-utils-react-hooks';

export interface FormItemProps extends FormItemAttrOptions, LayoutFormItemProps {
  /**不进行样式渲染*/
  noStyle?: boolean;
}

/**表单项基础实例*/
const FormItemInstance = memo((props: FormItemProps) => {
  const {
    labelMode,
    noStyle,
    onlyRuleStyle,
    label,
    helpText,
    extra,
    errorLayout,
    required,
    showColon,
    colSpan,
    rowSpan,
    ...rest
  } = props;
  const { children, ruleInstance, formItemInstance, htmlFor, validateResult } = useFormItemAttr({ ...rest });
  if (noStyle) {
    return (
      <FormItemParentNameProvider name={formItemInstance.name} sort={formItemInstance.sort}>
        {children}
      </FormItemParentNameProvider>
    );
  }
  return (
    <FormItemParentNameProvider name={formItemInstance.name} sort={formItemInstance.sort}>
      <LayoutFormItem
        labelMode={labelMode}
        onlyRuleStyle={onlyRuleStyle}
        required={required || ruleInstance?.isRequired?.()}
        label={label}
        helpText={helpText}
        extra={extra}
        errorLayout={errorLayout}
        showColon={showColon}
        colSpan={colSpan}
        rowSpan={rowSpan}
        htmlFor={htmlFor}
        validateResult={validateResult}
      >
        {children}
      </LayoutFormItem>
    </FormItemParentNameProvider>
  );
});

/**表单项*/
export const FormItem = memo((props: Partial<FormItemProps>) => {
  const { name } = props;
  if (name) {
    return <FormItemInstance {...props} name={name} />;
  }
  const {
    labelMode,
    onlyRuleStyle,
    label,
    helpText,
    extra,
    errorLayout,
    required,
    showColon,
    colSpan,
    rowSpan,
    children,
  } = props;
  return (
    <LayoutFormItem
      labelMode={labelMode}
      onlyRuleStyle={onlyRuleStyle}
      required={required}
      label={label}
      helpText={helpText}
      extra={extra}
      errorLayout={errorLayout}
      showColon={showColon}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </LayoutFormItem>
  );
});

/**隐藏表单项*/
export const FormHideItem = memo((props: FormItemProps) => {
  const { name, sort, isJoinParentField } = props;
  const { isHide } = useRegisterFormHideItem({ name, sort: sort, isJoinParentField });
  if (isHide) {
    return <Fragment />;
  }
  return <FormItemInstance {...props} />;
});
