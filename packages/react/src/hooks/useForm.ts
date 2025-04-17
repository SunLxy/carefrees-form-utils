import { FormInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef } from "react"

/**表单实例 Context */
export const FormInstanceContext = createContext(new FormInstanceBase())

/**子项中获取表单实例*/
export function useFormInstance<T = any>() { return useContext<FormInstanceBase<T>>(FormInstanceContext) }

/**初始化表单实例*/
export function useForm<T = any>(form?: FormInstanceBase<T>) {
  const ref = useRef<FormInstanceBase<T>>()
  if (!ref.current) {
    if (form) {
      ref.current = form
    } else {
      ref.current = new FormInstanceBase<T>()
    }
  }
  return ref.current
}