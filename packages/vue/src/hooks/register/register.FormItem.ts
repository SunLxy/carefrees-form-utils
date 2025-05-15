/**
 * @description 注册组件
 */

import { ref, toValue, watch } from 'vue';
import type { RuleItem } from 'async-validator';
import { useFormInject } from '../useForm';
import { useFormItem } from '../useFormItem';
import { useFormItemParentNameInject } from '../useFormItemParentName';
import { useEffect } from '../useEffect';
import { RuleInstanceBase2 } from '../../instance/ruleIntsnace';

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
  const ruleInstance = ref(new RuleInstanceBase2());
  const formItemInstance = useFormItem();

  watch(
    () => [form],
    () => {
      ruleInstance.value.instance = form;
      formItemInstance.instance = form;
    },
    { immediate: true },
  );

  watch(
    () => [toValue(newName)],
    () => {
      ruleInstance.value.ctor(toValue(newName), rules || []);
      formItemInstance.ctor(toValue(newName), toValue(ruleInstance) as any);
    },
    { immediate: true },
  );

  watch(
    () => [toValue(newSort)],
    () => {
      ruleInstance.value.sort = toValue(newSort);
      formItemInstance.sort = toValue(newSort);
    },
    { immediate: true },
  );

  watch(
    () => [toValue(parentItem)],
    () => {
      formItemInstance.parentDataField = toValue(toValue(parentItem).name);
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
