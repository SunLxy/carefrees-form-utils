import { ref, toValue, watch } from 'vue';
import { RegisterFormItemOptions } from './register.FormItem';
import { FormHideItemInstanceBase } from '@carefrees/form-utils';
import { useFormItemParentNameInject } from '../useFormItemParentName';
import { useFormInject } from '../useForm';
import { useEffect } from '../useEffect';

interface RegisterFormHideItemOptions extends Omit<RegisterFormItemOptions, 'rules'> {}

/**注册表单隐藏表单项到表单实例中*/
export const useRegisterFormHideItem = (options: RegisterFormHideItemOptions) => {
  const { name, sort, isJoinParentField = true } = options;
  const form = useFormInject();
  const { newName, newSort } = useFormItemParentNameInject({ name, sort, isJoinParentField });
  const hideItemInstance = ref<FormHideItemInstanceBase>(new FormHideItemInstanceBase().ctor(newName.value));
  const isHide = ref(form.getFieldHideValue(newName.value));
  watch(
    () => [toValue(isHide)],
    () => {
      hideItemInstance.value.preHideValue = isHide.value;
    },
    { immediate: true },
  );

  const setValue = () => {
    isHide.value = form.getFieldHideValue(newName.value);
  };

  hideItemInstance.value.updatedItem = setValue;

  watch(
    () => [form, toValue(newSort)],
    () => {
      hideItemInstance.value.instance = form;
      hideItemInstance.value.sort = toValue(newSort);
    },
    { immediate: true },
  );

  useEffect(() => {
    return form.registerFormHideItem(toValue(hideItemInstance) as FormHideItemInstanceBase);
  });

  return { form, isHide };
};
