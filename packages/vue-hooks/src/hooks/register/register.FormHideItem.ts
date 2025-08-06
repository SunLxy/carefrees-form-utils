import { ref, watch, toValue } from 'vue';
import { RegisterFormItemOptions } from './register.FormItem';
import { useFormItemParentNameInject } from '../useFormItemParentName';
import { useFormInject } from '../useForm';

interface RegisterFormHideItemOptions extends Omit<RegisterFormItemOptions, 'rules'> {}

/**注册表单隐藏表单项到表单实例中*/
export const useRegisterFormHideItem = (options: RegisterFormHideItemOptions) => {
  const { name, sort, isJoinParentField = true } = options;
  const form = useFormInject();
  const { newName } = useFormItemParentNameInject({
    name,
    sort,
    isJoinParentField,
  });
  const isHide = ref(form.value.getFieldHideValue(newName.value));

  watch(
    () => [form, toValue(newName)],
    () => {
      isHide.value = form.value.getFieldHideValue(newName.value);
    },
    { immediate: true },
  );

  return { form, isHide };
};
