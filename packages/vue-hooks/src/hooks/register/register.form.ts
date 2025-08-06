import { useMultipleFormInject } from '../useMultipleForm';
import { FormInstanceBase } from '../../instance/formInstance';
import { useEffect } from '../useEffect';
import { Ref } from 'vue';

/**注册表单实例到多表单收集实例中*/
export const useRegisterForm = (form: Ref<FormInstanceBase>, name?: string) => {
  const multipleForm = useMultipleFormInject();
  useEffect(() => {
    if (name) return multipleForm.value.ctor(name, form);
  });
  return multipleForm;
};
