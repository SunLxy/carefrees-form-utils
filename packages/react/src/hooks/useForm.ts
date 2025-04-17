import { FormInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef } from "react"

/**表单实例 Context */
export const FormInstanceContext = createContext(new FormInstanceBase())

/**子项中获取表单实例*/
export const useFormInstance = () => useContext(FormInstanceContext)

/**初始化表单实例*/
export const useForm = (form?: FormInstanceBase) => {
  const ref = useRef<FormInstanceBase>()
  if (!ref.current) {
    if (form) {
      ref.current = form
    } else {
      ref.current = new FormInstanceBase()
    }
  }
  return ref.current
}