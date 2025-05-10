import { provide, inject, computed, ComputedRef, ref, toValue } from 'vue';
import { PartialComputedRefs } from '../interface';

export interface FormItemParentNamOptions {
  /**字段*/
  name: string;
  /**排序*/
  sort?: string;
  /**是否拼接父级字段*/
  isJoinParentField?: boolean;
}

export type FormItemParentNameProviderProps = PartialComputedRefs<Omit<FormItemParentNamOptions, 'isJoinParentField'>>;

const parentNameProvideSymbol = Symbol('carefrees-parent-name');

export const useFormItemParentNameProvide = (props: FormItemParentNameProviderProps) => {
  const { name, sort } = props;
  provide(
    parentNameProvideSymbol,
    computed(() => ({ name, sort })),
  );
};

/**表单项获取父级字段*/
export const useFormItemParentNameInject = (options: FormItemParentNamOptions) => {
  const { isJoinParentField = true, sort, name } = options;
  const parentItem = inject<ComputedRef<FormItemParentNameProviderProps>>(
    parentNameProvideSymbol,
    computed(() => ({ name: ref(''), sort: ref('') })),
  );
  const newName = computed(() => {
    const _name = toValue(parentItem.value.name);
    if (_name && isJoinParentField) {
      if (/^\./.test(`${name}`)) {
        return [_name, name].filter(Boolean).join('');
      } else if (name) {
        return [_name, '.', name].filter(Boolean).join('');
      }
      return [_name, name].filter(Boolean).join('');
    }
    return [name].filter(Boolean).join('');
  });
  const newSort = computed(() => {
    const _sort = toValue(parentItem.value.sort);
    return [isJoinParentField ? _sort : '', sort].filter(Boolean).join('-');
  });
  return { newName, newSort, parentItem };
};
