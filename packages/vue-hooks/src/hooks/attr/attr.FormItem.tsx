import { FormInstanceBase } from '../../instance/formInstance';
import { FormItemInstanceBase } from '../../instance/formItemInstance';
import { get } from '../../utils';
import { useHtmlFor } from './../useHtmlFor';
import { useRegisterFormItem, RegisterFormItemOptions } from './../register/register.FormItem';
import { computed, Ref, ref, toValue, watch } from 'vue';
import type { RuleInstanceBase } from '../../instance/ruleIntsnace';

export interface FormItemAttrOptions extends RegisterFormItemOptions {
  /**依赖更新项*/
  dependencies?: string[];
  /**通知 只用于校验规则提示 字段 */
  noticeOnlyRuleDataField?: string[];
  /**是否保护值(不进行表单项组件卸载重置初始值)*/
  preserve?: boolean;
  /**重写规则*/
  useRules?: (
    ruleInstance: Ref<RuleInstanceBase>,
    form: Ref<FormInstanceBase>,
    formItemInstance: Ref<FormItemInstanceBase>,
  ) => void;
  /**输入框属性重写*/
  useAttrs?: (attrs: any, form: Ref<FormInstanceBase>, formItemInstance: Ref<FormItemInstanceBase>) => any;
  /**输入框属性*/
  inputAttrs?: Object;
  /**传递组件字段*/
  valuePropName?: string;
  /**取值字段(默认和valuePropName值相同)*/
  getValuePath?: string;
  /**自定义获取值*/
  getValueFromEvent?: (event: any, form: Ref<FormInstanceBase>, formItemInstance: Ref<FormItemInstanceBase>) => any;
  /**值格式化*/
  formatValue?: (
    value: any,
    form: Ref<FormInstanceBase>,
    formItemInstance: Ref<FormItemInstanceBase>,
    event: any,
  ) => any;
  /**触发数据更新之后触发（用于数据联动之类的）*/
  onAfterUpdate?: (
    value: any,
    form: Ref<FormInstanceBase>,
    formItemInstance: Ref<FormItemInstanceBase>,
    event: any,
  ) => void;
  /**事件名称*/
  trigger?: string;
}

/**表单项参数*/
export const useFormItemAttr = (options: FormItemAttrOptions) => {
  const {
    trigger = 'onChange',
    preserve,
    valuePropName = 'value',
    getValuePath = valuePropName,
    getValueFromEvent,
    formatValue,
    onAfterUpdate,
    useAttrs,
    useRules,
    noticeOnlyRuleDataField,
  } = options;

  const { formItemInstance, form, ruleInstance, newName, newSort } = useRegisterFormItem(options);
  formItemInstance.value.noticeOnlyRuleDataField = noticeOnlyRuleDataField;
  formItemInstance.value.onAfterUpdate = onAfterUpdate;
  formItemInstance.value.preserve = preserve;
  /**获取值*/
  const oldValue = ref(get(toValue(form.value.formData), toValue(newName)));
  const oldInputAttrs = ref(options.inputAttrs || {});
  watch(
    () => options.inputAttrs,
    (newVal) => {
      oldInputAttrs.value = newVal || {};
    },
  );
  watch(
    () => [get(toValue(form.value.formData), toValue(newName)), toValue(newName)],
    () => {
      oldValue.value = form.value.getFieldValue(toValue(newName));
    },
    { immediate: true },
  );

  watch(
    () => [toValue(formItemInstance).noticeOnlyRuleDataField, toValue(oldValue)],
    () => {
      const formInstance = toValue(form);
      const newVal = toValue(formItemInstance).noticeOnlyRuleDataField;
      if (Array.isArray(newVal) && newVal.length) {
        formInstance.onlyValidate(newVal);
      }
    },
    { immediate: true },
  );

  const onValueChange = (event: any) => {
    try {
      const formItem = toValue(formItemInstance);
      const formInstance = toValue(form);
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
        formInstance.updatedFieldValue(toValue(newName), value, 'validate');
        formItem.onAfterUpdate?.(value, form, formItemInstance, event);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const htmlFor = useHtmlFor(newName);

  watch(
    () => toValue(htmlFor),
    () => {
      formItemInstance.value.htmlFor = htmlFor.value;
    },
    { immediate: true },
  );

  /**属性处理*/
  const newAttrs = computed(() => {
    const _attr = oldInputAttrs.value || {};
    return {
      ..._attr,
      [trigger]: onValueChange,
      name: toValue(newName),
      id: toValue(htmlFor),
      [valuePropName]: toValue(oldValue),
    };
  });

  const attrsLastData = ref(toValue(newAttrs));

  watch(
    () => [toValue(newAttrs), toValue(oldValue)],
    () => {
      attrsLastData.value = useAttrs?.(toValue(newAttrs), form, formItemInstance) || toValue(newAttrs);
      formItemInstance.value.control = attrsLastData;
    },
    { immediate: true },
  );

  /**规则处理**/
  const validateResult = ref(toValue(ruleInstance).getValidateResult());

  /**规则变化，值变更触发*/
  watch(
    () => [toValue(oldValue), toValue(toValue(ruleInstance).rules)],
    () => {
      useRules?.(ruleInstance, form, formItemInstance);
      ruleInstance.value.validate();
    },
  );

  watch(
    () => [toValue(toValue(ruleInstance).messages), toValue(toValue(ruleInstance).rules)],
    () => {
      validateResult.value = toValue(ruleInstance).getValidateResult();
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
