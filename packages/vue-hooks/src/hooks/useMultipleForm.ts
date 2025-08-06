import { MultipleInstanceBase } from '../instance/multipleInstance';
import { provide, inject, ref, Ref, toValue } from 'vue';

const multipleFormProvideSymbol = Symbol('carefrees-multiple-form');

/**多表单收集 Context */
export function useMultipleFormProvide(multipleForm?: Ref<MultipleInstanceBase> | MultipleInstanceBase) {
  const newMultipleForm = useMultipleForm(multipleForm);
  provide(multipleFormProvideSymbol, newMultipleForm);
}

/**子项中获取 多表单收集 实例*/
export function useMultipleFormInject() {
  const multipleForm = inject<Ref<MultipleInstanceBase>>(multipleFormProvideSymbol, ref(new MultipleInstanceBase()));
  return multipleForm;
}

/**初始化 多表单收集 实例*/
export function useMultipleForm(multipleForm?: Ref<MultipleInstanceBase> | MultipleInstanceBase) {
  const refForm = ref<MultipleInstanceBase>();
  if (!refForm.value) {
    const value = toValue(multipleForm);
    if (value) {
      refForm.value = value;
    } else {
      refForm.value = new MultipleInstanceBase();
    }
  }
  return refForm;
}
