import { useMultipleFormInject } from '../useMultipleForm';
import { FormInstanceBase } from '@carefrees/form-utils';
import { useEffect } from '../useEffect';

/**注册表单实例到多表单收集实例中*/
export const useRegisterForm = (form: FormInstanceBase, name?: string) => {
  const multipleForm = useMultipleFormInject();
  useEffect(() => {
    if (name) return multipleForm.ctor(name, form);
  });
  return multipleForm;
};
