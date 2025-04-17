import { FormListInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef } from "react"

/**表单List实例 Context */
export const FormListInstanceContext = createContext(new FormListInstanceBase())

/**子项中获取表单List实例*/
export const useFormListInstance = () => useContext(FormListInstanceContext)

/**初始化 表单List实例*/
export const useFormList = (formList?: FormListInstanceBase) => {
  const ref = useRef<FormListInstanceBase>()
  if (!ref.current) {
    if (formList) {
      ref.current = formList
    } else {
      ref.current = new FormListInstanceBase()
    }
  }
  return ref.current
}
