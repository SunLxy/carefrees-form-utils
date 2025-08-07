import { Component, StyleValue } from 'vue';
import { LayoutFormItemProps } from './layout.formItem';
import { FormLayoutProps } from './layout';
import type { FormInstanceBase, ValidateErrorEntity, FormItemAttrOptions } from '@carefrees/form-utils-vue-hooks';

export interface FormItemProps extends FormItemAttrOptions, LayoutFormItemProps {
  /**不进行样式渲染*/
  noStyle?: boolean;
  /**输入框组件*/
  input?: Component | string;
}

export interface FormProps<T = any> extends FormLayoutProps {
  form?: FormInstanceBase<T>;
  style?: StyleValue;
  class?: string;
  layoutClass?: string;
  layoutStyle?: StyleValue;
  /**表单数据*/
  formData?: Object;
  /**提交保存 验证成功*/
  onFinish?: (values: T) => void;
  /**提交保存 验证失败*/
  onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;
  /**隐藏表单项初始值*/
  hideData?: Record<string, boolean>;
  /**表单名称*/
  name?: string;
  /**背景颜色*/
  bgcolor?: string;
}
