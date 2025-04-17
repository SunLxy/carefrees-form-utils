import { FormItemInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef } from "react"

/**表单项实例 Context */
export const FormItemInstanceContext = createContext(new FormItemInstanceBase())

/**子项中获取表单项实例*/
export const useFormItemInstance = () => useContext(FormItemInstanceContext)

/**s初始化 表单项实例*/
export const useFormItem = (formItem?: FormItemInstanceBase) => {
  const ref = useRef<FormItemInstanceBase>()
  if (!ref.current) {
    if (formItem) {
      ref.current = formItem
    } else {
      ref.current = new FormItemInstanceBase()
    }
  }
  return ref.current
}