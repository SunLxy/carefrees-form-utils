import { FormListInstanceBase } from "@carefrees/form-utils"
import { createContext, useContext, useRef, useMemo } from "react"

export const FormListInstanceContext = createContext(new FormListInstanceBase())

export const useFormListInstance = () => useContext(FormListInstanceContext)

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

export interface FormListNameOptions {
  /**字段*/
  name: string
  /**排序*/
  sort?: string
  /**是否拼接父级字段*/
  isJoinParentField?: boolean
}

export const useFormListName = (options: FormListNameOptions) => {
  const { isJoinParentField = true, sort, name } = options
  const formListInstance = useFormListInstance()
  const parentListName = formListInstance.name
  const parentListSort = formListInstance.sort
  const newName = useMemo(() => {
    if (parentListName && isJoinParentField) {
      if (/^\./.test(`${name}`)) {
        return [parentListName, name].filter(Boolean).join('')
      } else if (name) {
        return [parentListName, '.', name].filter(Boolean).join('')
      }
      return [parentListName, name].filter(Boolean).join('')
    }
    return [name].filter(Boolean).join('')
  }, [isJoinParentField, name, parentListName])
  const newSort = useMemo(() => [isJoinParentField ? parentListSort : '', sort].filter(Boolean).join('-'), [isJoinParentField, parentListSort, sort])
  return { newName, newSort, formListInstance, parentName: parentListName }
}