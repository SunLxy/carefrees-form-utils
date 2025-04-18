
/**公共属性*/
import { createContext, useContext } from "react"
import type { LayoutFormItemProps } from "../layout/layout.formItem"
export interface AttrsOptions {
  /**列数据*/
  colCount?: number
  /**规则校验失败错误提示位置*/
  errorLayout?: LayoutFormItemProps['errorLayout']
  /**label显示模式*/
  labelMode?: LayoutFormItemProps['labelMode']
  /**是否显示label后的冒号*/
  showColon?: boolean
  /**表单项 className*/
  formItemClassName?: string
  /**表单项 style*/
  formItemStyle?: React.CSSProperties
  /**表单项 label  className*/
  formItemLabelClassName?: string
  /**表单项 label  style*/
  formItemLabelStyle?: React.CSSProperties
}

/**公共属性 Context */
export const AttrsContext = createContext<AttrsOptions>({
  colCount: 4,
  errorLayout: "left-bottom",
  labelMode: "top",
  showColon: true,
})

/**子项中获取公共属性*/
export const useAttrs = () => useContext(AttrsContext)

