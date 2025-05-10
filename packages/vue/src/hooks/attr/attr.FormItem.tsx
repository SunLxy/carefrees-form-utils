import { RuleInstanceBase, FormInstanceBase, FormItemInstanceBase, get } from '@carefrees/form-utils';
import { useHtmlFor } from './../useHtmlFor';
import { useRegisterFormItem, RegisterFormItemOptions } from './../register/register.FormItem';
import { computed, ref, watch } from 'vue';

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
  inputAttrs?: Object;
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
    inputAttrs,
    ...rest
  } = options;
  const { formItemInstance, form, ruleInstance, newName, newSort, deepRefData } = useRegisterFormItem({ ...rest });
  formItemInstance.dependencies = dependencies;
  formItemInstance.noticeOnlyRuleDataField = noticeOnlyRuleDataField;
  formItemInstance.isNoticeParentField = isNoticeParentField;
  formItemInstance.onAfterUpdate = onAfterUpdate;
  formItemInstance.noticeWatchField = noticeWatchField;
  formItemInstance.preserve = preserve;
  /**获取值*/
  const oldValue = ref(form.getFieldValue(newName.value));
  watch(
    () => [form.getFieldValue(newName.value), newName.value, deepRefData.value],
    () => {
      oldValue.value = form.getFieldValue(newName.value);
    },
    { immediate: true },
  );

  const onValueChange = (event: any) => {
    try {
      let value = event;
      if (typeof getValueFromEvent === 'function') {
        value = getValueFromEvent(event, form, formItemInstance);
      } else if (event && event.target && typeof event.target === 'object' && getValuePath in event.target) {
        value = get(event.target, getValuePath);
      }
      if (typeof formatValue === 'function') {
        value = formatValue(value, form, formItemInstance, event);
      }
      if (oldValue.value !== value) {
        form.updatedFieldValue(newName.value, value, 'validate');
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
  const htmlFor = useHtmlFor(newName);
  watch(
    () => htmlFor,
    () => {
      formItemInstance.htmlFor = htmlFor.value;
    },
    { immediate: true },
  );

  /**属性处理*/
  const newAttrs = computed(() => {
    const _attr = inputAttrs || {};
    return {
      ..._attr,
      [trigger]: onValueChange,
      name: newName.value,
      id: htmlFor.value,
      [valuePropName]: oldValue.value,
    };
  });

  const attrsLastData = ref(newAttrs.value);
  watch(
    () => [newAttrs.value, deepRefData.value, oldValue.value],
    () => {
      attrsLastData.value = useAttrs?.(newAttrs.value, form, formItemInstance) || newAttrs.value;
    },
    { immediate: true },
  );

  /**规则处理**/
  const validateResult = ref(ruleInstance.value.getValidateResult());
  watch(
    () => [deepRefData.value, oldValue.value],
    () => {
      useRules?.(ruleInstance.value as RuleInstanceBase, form, formItemInstance);
    },
  );

  watch(
    () => [ruleInstance.value.messages, ruleInstance.value.rules, deepRefData.value],
    () => {
      validateResult.value = ruleInstance.value.getValidateResult();
    },
  );

  return {
    valuePropName,
    htmlFor,
    onChange: onValueChange,
    formItemInstance,
    form,
    ruleInstance,
    newAttrs,
    attrsLastData,
    validateResult,
    newSort,
    newName,
  };
};
