import { FormInstanceBase } from '../instance/formInstance';

import { provide, inject, ref, Ref, toValue } from 'vue';

const formProvideSymbol = Symbol('carefrees-form');

/**表单实例 Context */
export function useFormProvide<T = any>(form: Ref<FormInstanceBase<T>> | FormInstanceBase<T>) {
  const newForm = useForm(form);
  provide(formProvideSymbol, newForm);
}

/**子项中获取表单实例*/
export function useFormInject<T = any>() {
  const form = inject<Ref<FormInstanceBase<T>>>(
    formProvideSymbol,
    ref(new FormInstanceBase<T>()) as unknown as Ref<FormInstanceBase<T>>,
  );
  return form;
}

/**初始化表单实例*/
export function useForm<T = any>(form?: Ref<FormInstanceBase<T>> | FormInstanceBase<T>) {
  const refForm = ref<FormInstanceBase<T>>();
  if (!refForm.value) {
    const value = toValue(form);
    if (value) {
      refForm.value = value;
    } else {
      refForm.value = new FormInstanceBase<T>();
    }
  }
  return refForm as Ref<FormInstanceBase<T>>;
}
