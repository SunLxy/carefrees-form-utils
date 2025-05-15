import { watch, toValue } from 'vue';
import { RegisterFormItemOptions, useRegisterFormItem } from './register.FormItem';
import { useFormList } from '../useFormList';
import { useEffect } from '../useEffect';

export interface RegisterFormListOptions extends RegisterFormItemOptions {}

/**注册表单List到表单实例中*/
export const useRegisterFormList = (options: RegisterFormListOptions) => {
  const { ruleInstance, formItemInstance, form, newName, parentItem } = useRegisterFormItem(options);
  const formListInstance = useFormList();

  watch(
    () => [toValue(newName)],
    () => {
      formListInstance.ctor(toValue(newName));
    },
    { immediate: true },
  );

  watch(
    () => [form, formItemInstance, toValue(ruleInstance)],
    () => {
      formListInstance.instance = form;
      formListInstance.formItemInstance = formItemInstance;
      formListInstance.rule = toValue(ruleInstance) as any;
    },
    { immediate: true },
  );

  watch(
    () => [options.sort, toValue(parentItem)],
    () => {
      formListInstance.sort = toValue(parentItem.value.sort);
      formListInstance.parentDataField = toValue(parentItem.value.name);
    },
    { immediate: true },
  );

  useEffect(() => {
    return form.registerFormList(newName.value, formListInstance);
  });

  return {
    ruleInstance,
    formItemInstance,
    formListInstance,
  };
};
