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
      formListInstance.value.ctor(toValue(newName));
    },
    { immediate: true },
  );

  watch(
    () => [toValue(form), formItemInstance, ruleInstance],
    () => {
      formListInstance.value.instance = form;
      formListInstance.value.formItemInstance = formItemInstance;
      formListInstance.value.rule = ruleInstance;
    },
    { immediate: true },
  );

  watch(
    () => [options.sort, toValue(parentItem)],
    () => {
      formListInstance.value.sort = toValue(parentItem.value.sort);
      formListInstance.value.parentDataField = toValue(parentItem.value.name);
    },
    { immediate: true },
  );

  useEffect(() => {
    return form.value.registerFormList(newName.value, formListInstance);
  });

  return {
    ruleInstance,
    formItemInstance,
    formListInstance,
  };
};
