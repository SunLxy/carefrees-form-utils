import { RuleInstanceBase, FormInstanceBase, FormItemInstanceBase, get } from '@carefrees/form-utils';
import { useRegisterFormItem, RegisterFormItemOptions } from '../register/register.FormItem';
import { useHtmlFor } from '../useHtmlFor';
import React, { cloneElement, isValidElement, useMemo } from 'react';

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
  /**取值字段(默认和valuePropName值相同)*/
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
export const useFormItemAttr = (options: FormItemAttrOptions) => {
  const {
    trigger = 'onChange',
    dependencies,
    noticeOnlyRuleDataField,
    isNoticeParentField,
    noticeWatchField,
    preserve,
    valuePropName = 'value',
    getValuePath = valuePropName,
    getValueFromEvent,
    formatValue,
    onAfterUpdate,
    useAttrs,
    useRules,
    attrs,
    children,
    ...rest
  } = options;
  const { formItemInstance, form, ruleInstance, newName } = useRegisterFormItem({ ...rest });
  formItemInstance.dependencies = dependencies;
  formItemInstance.noticeOnlyRuleDataField = noticeOnlyRuleDataField;
  formItemInstance.isNoticeParentField = isNoticeParentField;
  formItemInstance.onAfterUpdate = onAfterUpdate;
  formItemInstance.noticeWatchField = noticeWatchField;
  formItemInstance.preserve = preserve;

  /**获取值*/
  const oldValue = form.getFieldValue(newName);

  const onValueChange = (event: any) => {
    try {
      let value = event;
      const target = event?.detail || event?.target;
      if (typeof getValueFromEvent === 'function') {
        value = getValueFromEvent(event, form, formItemInstance);
      } else if (event && target && typeof target === 'object' && getValuePath in target) {
        value = get(target, getValuePath);
      }
      if (typeof formatValue === 'function') {
        value = formatValue(value, form, formItemInstance, event);
      }
      if (oldValue !== value) {
        form.updatedFieldValue(newName, value, 'validate');
        formItemInstance.onAfterUpdate?.(value, form, formItemInstance, event);
        if (Array.isArray(formItemInstance.noticeWatchField) && formItemInstance.noticeWatchField.length) {
          form.noticeWatch(formItemInstance.noticeWatchField);
        }
        if (
          Array.isArray(formItemInstance.noticeOnlyRuleDataField) &&
          formItemInstance.noticeOnlyRuleDataField.length
        ) {
          form.onlyValidate(formItemInstance.noticeOnlyRuleDataField);
        }
        if (formItemInstance.isNoticeParentField && formItemInstance.parentDataField) {
          form.notice(formItemInstance.parentDataField);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  formItemInstance.onChange = onValueChange;

  // useHtmlFor
  const htmlFor = useHtmlFor(newName);
  formItemInstance.htmlFor = htmlFor;

  const control: any = {
    [trigger]: onValueChange,
    ...attrs,
    name: newName,
    id: htmlFor,
    [valuePropName]: oldValue,
  };

  /**触发数据调整*/
  const newControl = useAttrs?.(control, form, formItemInstance) || control;
  formItemInstance.control = newControl;
  useRules?.(ruleInstance, form, formItemInstance);
  const validateResult = useMemo(() => ruleInstance.getValidateResult(), [ruleInstance.messages]);

  return {
    children: isValidElement(children) ? cloneElement(children, newControl) : children,
    form,
    formItemInstance,
    ruleInstance,
    onChange: onValueChange,
    htmlFor,
    validateResult,
  };
};
