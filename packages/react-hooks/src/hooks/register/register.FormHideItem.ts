import { useEffect, useRef } from 'react';
import { RegisterFormItemOptions } from './register.FormItem';
import { FormHideItemInstanceBase } from '@carefrees/form-utils';
import { useFormItemParentName } from '../useFormItemParentName';
import { useFormInstance } from '../useForm';
import { useUpdate } from '../useUpdate';

interface RegisterFormHideItemOptions extends Omit<RegisterFormItemOptions, 'rules'> {}

/**注册表单隐藏表单项到表单实例中*/
export const useRegisterFormHideItem = (options: RegisterFormHideItemOptions) => {
  const { name, sort, isJoinParentField = true } = options;
  const form = useFormInstance();
  const _update = useUpdate();
  const { newName, newSort } = useFormItemParentName({ name, sort, isJoinParentField });
  const hideItemInstance = useRef(new FormHideItemInstanceBase().ctor(newName)).current;
  const isHide = form.getFieldHideValue(newName);

  hideItemInstance.instance = form;
  hideItemInstance.updated = _update.current;
  hideItemInstance.sort = newSort;

  useEffect(() => {
    const unMount = form.registerFormHideItem(hideItemInstance);
    return () => unMount();
  }, [newName]);

  return { form, isHide };
};
