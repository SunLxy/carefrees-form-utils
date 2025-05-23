/**
 * @description 注册组件
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { RuleInstanceBase } from '@carefrees/form-utils';
import type { RuleItem } from 'async-validator';
import { useFormInstance } from '../useForm';
import { useFormItem } from '../useFormItem';
import { useFormItemParentName } from '../useFormItemParentName';

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
  const form = useFormInstance();
  const { newName, newSort, parentName } = useFormItemParentName({ name, sort, isJoinParentField });
  const [, setValue] = useState({});

  // 注册规则
  // 注册单个实例
  const ruleInstance = useRef(new RuleInstanceBase()).current;
  useMemo(() => ruleInstance.ctor(newName, rules), [rules, newName]);
  ruleInstance.instance = form;
  ruleInstance.sort = newSort;

  const formItemInstance = useFormItem();
  useMemo(() => formItemInstance.ctor(newName, ruleInstance), []);
  formItemInstance.instance = form;
  formItemInstance.sort = newSort;
  formItemInstance.parentDataField = parentName;

  formItemInstance.updated = setValue;
  ruleInstance.updated = setValue;

  useEffect(() => {
    const unMount = form.registerFormItem(formItemInstance);
    return () => unMount();
  }, []);

  return { ruleInstance, formItemInstance, form, parentName, newName };
};
