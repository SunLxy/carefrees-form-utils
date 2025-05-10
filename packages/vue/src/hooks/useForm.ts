import { FormInstanceBase } from '@carefrees/form-utils';
import { provide, inject, ref, Ref } from 'vue';

const formProvideSymbol = Symbol('carefrees-form');

/**表单实例 Context */
export function useFormProvide<T = any>(form: FormInstanceBase<T>) {
  provide(formProvideSymbol, form);
}

/**子项中获取表单实例*/
export function useFormInject<T = any>() {
  const form = inject<FormInstanceBase<T>>(formProvideSymbol, new FormInstanceBase<T>());
  return form;
}

/**初始化表单实例*/
export function useForm<T = any>(form?: FormInstanceBase<T>) {
  const refForm = ref<FormInstanceBase<T>>();
  if (!refForm.value) {
    if (form) {
      refForm.value = form;
    } else {
      refForm.value = new FormInstanceBase<T>();
    }
  }
  return refForm as Ref<FormInstanceBase<T>>;
}
