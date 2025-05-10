import { VNodeChild, StyleValue } from 'vue';
import { ComputedRefBase } from '.';

export interface LayoutFormItemProps {
  /**规则校验失败错误提示位置*/
  errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
  /**必填样式*/
  required?: boolean;
  /**label显示模式*/
  labelMode?: 'left' | 'top' | 'between' | 'hide';
  /**只进行规则样式*/
  onlyRuleStyle?: boolean;
  label?: VNodeChild;
  /**底部提示内容*/
  helpText?: VNodeChild;
  /**额外内容*/
  extra?: VNodeChild;
  /**是否显示label后的冒号*/
  showColon?: boolean;
  /**
   * 表单项占据列数
   * @default 1
   */
  colSpan?: number;
  /**
   * 表单项占据行数
   * @default 1
   */
  rowSpan?: number;

  htmlFor?: ComputedRefBase<string>;
  /**规则验证结果*/
  validateResult?: ComputedRefBase<{
    tip: string | (string | undefined)[];
    isInvalid: boolean;
  }>;
  // 样式部分
  style?: StyleValue;
  class?: string;
  labelStyle?: StyleValue;
  labelClass?: string;
}
