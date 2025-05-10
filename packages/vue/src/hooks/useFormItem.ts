import { FormItemInstanceBase } from '@carefrees/form-utils';
import { provide, inject, ref } from 'vue';

const formItemProvideSymbol = Symbol('carefrees-form-item');

/**表单项实例 Context */
export function useFormItemProvide(formItem: FormItemInstanceBase) {
  provide(formItemProvideSymbol, formItem);
}

/**子项中获取表单项实例*/
export function useFormItemInject() {
  const formItem = inject<FormItemInstanceBase>(formItemProvideSymbol, new FormItemInstanceBase());
  return formItem;
}

/**s初始化 表单项实例*/
export function useFormItem(formItem?: FormItemInstanceBase) {
  const refForm = ref<FormItemInstanceBase>();
  if (!refForm.value) {
    if (formItem) {
      refForm.value = formItem;
    } else {
      refForm.value = new FormItemInstanceBase();
    }
  }
  return refForm.value;
}
