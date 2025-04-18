import { FormListInstanceBase } from "@carefrees/form-utils"
import { provide, inject, ref } from "vue"

const formListProvideSymbol = Symbol("carefrees-form-list")

/**表单List实例 Context */
export function useFormItemProvide(formList: FormListInstanceBase) {
  provide(formListProvideSymbol, formList)
}

/**子项中获取表单List实例*/
export function useFormItemInject() {
  const formList = inject<FormListInstanceBase>(formListProvideSymbol, new FormListInstanceBase())
  return formList
}

/**初始化 表单List实例*/
export function useFormList(formList?: FormListInstanceBase) {
  const refForm = ref<FormListInstanceBase>()
  if (!refForm.value) {
    if (formList) {
      refForm.value = formList
    } else {
      refForm.value = new FormListInstanceBase()
    }
  }
  return refForm
}