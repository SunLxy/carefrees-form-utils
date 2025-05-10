/**
 * @description 注册组件
 */

import { ref, toValue, watch } from 'vue';
import { RuleInstanceBase } from '@carefrees/form-utils';
import type { RuleItem } from 'async-validator';
import { useFormInject } from '../useForm';
import { useFormItem } from '../useFormItem';
import { useFormItemParentNameInject } from '../useFormItemParentName';
import { useEffect } from '../useEffect';

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
export const useRegisterFormItem = (options: RegisterFormItemOptions) => {
  const { name, rules, sort, isJoinParentField = true } = options;
  const form = useFormInject();
  const deepRefData = ref<any>({});
  const { newName, newSort, parentItem } = useFormItemParentNameInject({ name, sort, isJoinParentField });
  // 注册规则
  // 注册单个实例
  const ruleInstance = ref(new RuleInstanceBase());
  const formItemInstance = useFormItem();

  watch(
    [form],
    () => {
      ruleInstance.value.instance = form;
      formItemInstance.instance = form;
    },
    { immediate: true },
  );

  watch(
    [newName.value],
    () => {
      ruleInstance.value.ctor(newName.value, rules || []);
      formItemInstance.ctor(newName.value, ruleInstance.value as RuleInstanceBase);
    },
    { immediate: true },
  );

  watch(
    [newSort.value],
    () => {
      ruleInstance.value.sort = newSort.value;
      formItemInstance.sort = newSort.value;
    },
    { immediate: true },
  );

  watch(
    [parentItem.value],
    () => {
      formItemInstance.parentDataField = toValue(parentItem.value.name);
    },
    { immediate: true },
  );

  const updated = () => {
    deepRefData.value = { a: new Date().valueOf() };
  };

  formItemInstance.updated = updated;
  ruleInstance.value.updated = updated;

  useEffect(() => form.registerFormItem(formItemInstance));

  return { ruleInstance, formItemInstance, form, newName, newSort, parentItem, deepRefData };
};
