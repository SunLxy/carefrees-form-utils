
/**公共属性*/
import { provide, inject, computed, StyleValue } from "vue"

export interface AttrsOptions {
  /**列数据*/
  colCount?: number
  /**规则校验失败错误提示位置*/
  errorLayout?: 'left-bottom' | "right-bottom" | 'top-right' | 'top-left'
  /**label显示模式*/
  labelMode?: "left" | "top" | "hide";
  /**是否显示label后的冒号*/
  showColon?: boolean
  /**表单项 className*/
  formItemClassName?: string
  /**表单项 style*/
  formItemStyle?: StyleValue
  /**表单项 label  className*/
  formItemLabelClassName?: string
  /**表单项 label  style*/
  formItemLabelStyle?: StyleValue
}

const attrsProvideSymbol = Symbol("carefrees-attrs")

export function useAttrsProvide(options: AttrsOptions) {
  const { colCount = 4, errorLayout = 'left-bottom', labelMode = 'top', showColon = true, formItemClassName, formItemStyle, formItemLabelClassName, formItemLabelStyle } = options
  const data = computed(() => {
    return { colCount, errorLayout, labelMode, showColon, formItemClassName, formItemStyle, formItemLabelClassName, formItemLabelStyle }
  })
  provide(attrsProvideSymbol, data)
}
/**子项中获取表单项实例*/
export function useAttrsInject() {

  const attrs = inject<AttrsOptions>(attrsProvideSymbol, {
    colCount: 4,
    errorLayout: "left-bottom",
    labelMode: "top",
    showColon: true,
  })
  return attrs
}
