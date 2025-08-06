import type { AttrsOptions } from '@carefrees/form-utils-vue-hooks';

import { VNodeChild, StyleValue } from 'vue';

export interface FormLayoutProps extends Omit<AttrsOptions, 'colCount'> {
  /**标题*/
  title?: VNodeChild;
  /**额外内容*/
  extra?: VNodeChild;
  /**是否占据整行*/
  isAllColSpan?: boolean;
  class?: string;
  /**头部ClassName*/
  headerClass?: string;
  /**内容Class*/
  bodyClass?: string;
  style?: StyleValue;
  /**头部样式*/
  headerStyle?: StyleValue;
  /**内容样式*/
  bodyStyle?: StyleValue;
  /**是否添加边框*/
  bordered?: boolean;
  /**列数据*/
  colCount?: number;
  /**
   * @description gap 属性是用来设置网格行与列之间的间隙，该属性是row-gap and column-gap的简写形式。
   */
  gap?: string | number;
}
