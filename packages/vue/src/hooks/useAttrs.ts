/**公共属性*/
import { provide, inject, computed, StyleValue, ComputedRef, ref, toRefs, reactive } from 'vue';
import { ComputedRefBase } from '../interface';

export type AttrsOptions = {
  /**列数据*/
  colCount?: ComputedRefBase<number | undefined>;
  /**规则校验失败错误提示位置*/
  errorLayout?: ComputedRefBase<'left-bottom' | 'right-bottom' | 'top-right' | 'top-left' | undefined>;
  /**label显示模式*/
  labelMode?: ComputedRefBase<'left' | 'top' | 'hide' | undefined>;
  /**是否显示label后的冒号*/
  showColon?: ComputedRefBase<boolean | undefined>;
  /**表单项 className*/
  formItemClass?: ComputedRefBase<string | undefined>;
  /**表单项 style*/
  formItemStyle?: ComputedRefBase<StyleValue | undefined>;
  /**表单项 label  className*/
  formItemLabelClass?: ComputedRefBase<string | undefined>;
  /**表单项 label  style*/
  formItemLabelStyle?: ComputedRefBase<StyleValue | undefined>;
};

const attrsProvideSymbol = Symbol('carefrees-attrs');

/**公共属性 Context */
export function useAttrsProvide(options: AttrsOptions) {
  const {
    colCount = ref(4),
    errorLayout = ref('left-bottom'),
    labelMode = ref('top'),
    showColon = ref(true),
    formItemClass,
    formItemStyle,
    formItemLabelClass,
    formItemLabelStyle,
  } = options;
  const data = computed(() => {
    return {
      colCount,
      errorLayout,
      labelMode,
      showColon,
      formItemClass,
      formItemStyle,
      formItemLabelClass,
      formItemLabelStyle,
    };
  });
  provide(attrsProvideSymbol, reactive(data));
}
/**子项中获取公共属性*/
export function useAttrsInject() {
  const attrs = inject<ComputedRef<AttrsOptions>>(
    attrsProvideSymbol,
    computed(() => ({
      colCount: ref(4),
      errorLayout: ref('left-bottom'),
      labelMode: ref('top'),
      showColon: ref(true),
    })),
  );
  return attrs;
}
