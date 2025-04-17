import { useEffect } from "react"
import { useMultipleFormInstance } from "../useMultipleForm"
import { FormInstanceBase } from "@carefrees/form-utils"

/**注册表单实例到多表单收集实例中*/
export const useRegisterForm = (form: FormInstanceBase, name?: string) => {
  const multipleForm = useMultipleFormInstance()
  useEffect(() => {
    let onMounted;
    if (name) {
      onMounted = multipleForm.ctor(name, form)
    }
    return () => {
      onMounted?.()
    }

  }, [name, form])
  return multipleForm
}