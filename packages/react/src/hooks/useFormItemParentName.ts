import { createContext, useContext, useMemo, createElement } from "react"

export const FormItemParentNameContext = createContext({ name: "", sort: "" })

export interface FormItemParentNamOptions {
  /**字段*/
  name: string
  /**排序*/
  sort?: string
  /**是否拼接父级字段*/
  isJoinParentField?: boolean
}


interface FormItemParentNameProviderProps extends Omit<FormItemParentNamOptions, 'isJoinParentField'> {
  children?: React.ReactNode
}

export const FormItemParentNameProvider = (props: FormItemParentNameProviderProps) => {
  const { name, sort, children } = props
  const value = useMemo(() => {
    return { name, sort }
  }, [name, sort])
  return createElement(FormItemParentNameContext.Provider, { value, children })
}

/**表单项获取父级字段*/
export const useFormItemParentName = (options: FormItemParentNamOptions) => {
  const { isJoinParentField = true, sort, name } = options
  const parentItem = useContext(FormItemParentNameContext)
  const parentName = parentItem.name
  const parentSort = parentItem.sort
  const newName = useMemo(() => {
    if (parentName && isJoinParentField) {
      if (/^\./.test(`${name}`)) {
        return [parentName, name].filter(Boolean).join('')
      } else if (name) {
        return [parentName, '.', name].filter(Boolean).join('')
      }
      return [parentName, name].filter(Boolean).join('')
    }
    return [name].filter(Boolean).join('')
  }, [isJoinParentField, name, parentName])
  const newSort = useMemo(() => [isJoinParentField ? parentSort : '', sort].filter(Boolean).join('-'), [isJoinParentField, parentSort, sort])

  return { newName, newSort, parentItem, parentName: parentName }
}

