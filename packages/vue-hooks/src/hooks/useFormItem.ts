import { FormItemInstanceBase } from '../instance/formItemInstance';
import { provide, inject, ref, Ref, toValue } from 'vue';

const formItemProvideSymbol = Symbol('carefrees-form-item');

/**表单项实例 Context */
export function useFormItemProvide(formItem: Ref<FormItemInstanceBase> | FormItemInstanceBase) {
  const newFormItem = useFormItem(formItem);
  provide(formItemProvideSymbol, newFormItem);
}

/**子项中获取表单项实例*/
export function useFormItemInject() {
  const formItem = inject<Ref<FormItemInstanceBase>>(
    formItemProvideSymbol,
    ref(new FormItemInstanceBase()) as Ref<FormItemInstanceBase>,
  );
  return formItem;
}

/** 初始化 表单项实例*/
export function useFormItem(formItem?: Ref<FormItemInstanceBase> | FormItemInstanceBase) {
  const refForm = ref<FormItemInstanceBase>();
  if (!refForm.value) {
    const value = toValue(formItem);
    if (value) {
      refForm.value = value;
    } else {
      refForm.value = new FormItemInstanceBase();
    }
  }
  return refForm as Ref<FormItemInstanceBase>;
}
