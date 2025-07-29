/**公共属性*/
import { createContext, useContext } from 'react';
export interface AttrsOptions {
  /**列数据*/
  colCount?: number;
  /**规则校验失败错误提示位置*/
  errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
  /**
   * label显示模式
   * @platform taro 支持 between
   */
  labelMode?: 'left' | 'top' | 'between' | 'hide';
  /**是否显示label后的冒号*/
  showColon?: boolean;
  /**表单项 className*/
  formItemClassName?: string;
  /**表单项 style*/
  formItemStyle?: React.CSSProperties;
  /**表单项 label  className*/
  formItemLabelClassName?: string;
  /**表单项 label  style*/
  formItemLabelStyle?: React.CSSProperties;
  /**
   * 输入框底部边框
   */
  inputBordered?: boolean;
}

/**公共属性 Context */
export const AttrsContext = createContext<AttrsOptions>({
  colCount: 4,
  errorLayout: 'left-bottom',
  labelMode: 'top',
  showColon: true,
  inputBordered: true,
});

/**子项中获取公共属性*/
export const useAttrs = () => useContext(AttrsContext);
