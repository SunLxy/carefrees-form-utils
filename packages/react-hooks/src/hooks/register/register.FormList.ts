import { useEffect, useMemo } from 'react';
import { RegisterFormItemOptions, useRegisterFormItem } from './register.FormItem';
import { useFormList } from '../useFormList';

export interface RegisterFormListOptions extends RegisterFormItemOptions {}

/**注册表单List到表单实例中*/
export const useRegisterFormList = (options: RegisterFormListOptions) => {
  const { ...rest } = options;
  const { ruleInstance, formItemInstance, form, newName, parentName } = useRegisterFormItem({ ...rest });
  const formListInstance = useFormList();

  useMemo(() => formListInstance.ctor(newName), [newName]);

  formListInstance.instance = form;
  formListInstance.rule = ruleInstance;
  formListInstance.sort = options.sort;
  formListInstance.formItemInstance = formItemInstance;
  formListInstance.parentDataField = parentName;

  useEffect(() => {
    const unMount = form.registerFormList(options.name, formListInstance);
    return () => unMount();
  }, [options.name, formListInstance]);

  return {
    ruleInstance,
    formItemInstance,
    formListInstance,
  };
};
