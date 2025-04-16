import { FormItemInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef } from "react"

export const FormItemInstanceContext = createContext(new FormItemInstanceBase())

export const useFormItemInstance = () => useContext(FormItemInstanceContext)

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