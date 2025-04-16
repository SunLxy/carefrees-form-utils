/**
 * @description 注册组件
*/

import { useEffect, useMemo, useRef } from "react"
import { RuleInstanceBase, FormItemInstanceBase } from "@carefrees/form-utils"
import type { RuleItem } from "async-validator"
import { useUpdate } from "./../useUpdate"
import { useFormInstance } from "../useForm"
import { useFormListName } from "../useFormList"
import { useFormItem } from "../useFormItem"

export interface RegisterFormItemOptions {
  /**字段*/
  name: string
  /**规则*/
  rules?: RuleItem[]
  /**排序值*/
  sort?: string
  /**是否拼接父级字段*/
  isJoinParentField?: boolean
}

/**注册表单项*/
export const useRegisterFormItem = (options: RegisterFormItemOptions) => {
  const { name, rules, sort, isJoinParentField = true } = options
  const form = useFormInstance()
  const { newName, newSort, parentName } = useFormListName({ name, sort, isJoinParentField });
  // 注册规则
  // 注册单个实例
  const ruleInstance = useRef(new RuleInstanceBase()).current;
  useMemo(() => ruleInstance.ctor(newName, rules), [rules, newName]);
  ruleInstance.instance = form
  ruleInstance.sort = newSort

  const formItemInstance = useFormItem()
  useMemo(() => formItemInstance.ctor(newName, ruleInstance), []);
  formItemInstance.instance = form
  formItemInstance.sort = newSort
  formItemInstance.parentDataField = parentName

  const _updated = useUpdate()
  formItemInstance.updated = _updated.current
  ruleInstance.updated = _updated.current

  useEffect(() => {
    const unMount = form.registerFormItem(formItemInstance);
    return () => unMount();
  }, [])

  return { ruleInstance, formItemInstance, form, parentName, newName }
}
