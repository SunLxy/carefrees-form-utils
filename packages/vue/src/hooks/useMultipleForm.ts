import { MultipleInstanceBase } from "@carefrees/form-utils"
import { provide, inject, ref } from "vue"

const multipleFormProvideSymbol = Symbol("carefrees-multiple-form")

/**多表单收集 Context */
export function useMultipleFormProvide(multipleForm?: MultipleInstanceBase) {
  const newMultipleForm = useMultipleForm(multipleForm)
  provide(multipleFormProvideSymbol, newMultipleForm)
}

/**子项中获取 多表单收集 实例*/
export function useMultipleFormInject() {
  const multipleForm = inject<MultipleInstanceBase>(multipleFormProvideSymbol, new MultipleInstanceBase())
  return multipleForm
}

/**初始化 多表单收集 实例*/
export function useMultipleForm(multipleForm?: MultipleInstanceBase) {
  const refForm = ref<MultipleInstanceBase>()
  if (!refForm.value) {
    if (multipleForm) {
      refForm.value = multipleForm
    } else {
      refForm.value = new MultipleInstanceBase()
    }
  }
  return refForm.value
}