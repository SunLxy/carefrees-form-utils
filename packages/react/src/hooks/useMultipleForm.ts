import { MultipleInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef, createElement } from "react"

/**多表单收集 Context */
export const MultipleFormInstanceContext = createContext(new MultipleInstanceBase())

/**子项中获取 多表单收集 实例*/
export const useMultipleFormInstance = () => useContext(MultipleFormInstanceContext)

/**初始化 多表单收集 实例*/
export const useMultipleForm = (multipleForm?: MultipleInstanceBase) => {
  const ref = useRef<MultipleInstanceBase>()
  if (!ref.current) {
    if (multipleForm) {
      ref.current = multipleForm
    } else {
      ref.current = new MultipleInstanceBase()
    }
  }
  return ref.current
}

export interface MultipleFormProviderProps {
  children: React.ReactNode
  multipleForm?: MultipleInstanceBase
}

/**多表单收集 Provider */
export const MultipleFormProvider = (props: MultipleFormProviderProps) => {
  const { children, multipleForm } = props
  const multipleFormInstance = useMultipleForm(multipleForm)
  return createElement(MultipleFormInstanceContext.Provider, {
    value: multipleFormInstance,
    children
  })
}

