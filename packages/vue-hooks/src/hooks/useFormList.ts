import { FormListInstanceBase } from '../instance/formListInstance';
import { provide, inject, ref, Ref, toValue } from 'vue';

const formListProvideSymbol = Symbol('carefrees-form-list');

/**表单List实例 Context */
export function useFormListProvide(formList: Ref<FormListInstanceBase> | FormListInstanceBase) {
  const newFormList = useFormList(formList);
  provide(formListProvideSymbol, newFormList);
}

/**子项中获取表单List实例*/
export function useFormListInject() {
  const formList = inject<Ref<FormListInstanceBase>>(
    formListProvideSymbol,
    ref(new FormListInstanceBase()) as Ref<FormListInstanceBase>,
  );
  return formList;
}

/**初始化 表单List实例*/
export function useFormList(formList?: Ref<FormListInstanceBase> | FormListInstanceBase) {
  const refForm = ref<FormListInstanceBase>();
  if (!refForm.value) {
    const value = toValue(formList);
    if (value) {
      refForm.value = value;
    } else {
      refForm.value = new FormListInstanceBase();
    }
  }
  return refForm as Ref<FormListInstanceBase>;
}
