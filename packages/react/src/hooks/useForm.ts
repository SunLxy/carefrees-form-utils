import { FormInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef } from "react"

export const FormInstanceContext = createContext(new FormInstanceBase())

export const useFormInstance = () => useContext(FormInstanceContext)

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