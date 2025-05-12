import { ComputedRef, Ref, VNodeChild, StyleValue } from 'vue';
import { FormItemAttrOptions } from '../hooks/attr/attr.FormItem';
import { LayoutFormItemProps } from './layout.formItem';
import { FormLayoutProps } from './layout';
import { FormInstanceBase, ValidateErrorEntity } from '@carefrees/form-utils';

export type ComputedRefBase<T> = ComputedRef<T> | Ref<T>;

export type PartialComputedRefs<T> = {
  [K in keyof T]: ComputedRefBase<T[K]>;
};

export interface FormItemProps extends FormItemAttrOptions, LayoutFormItemProps {
  /**不进行样式渲染*/
  noStyle?: boolean;
  /**输入框组件*/
  input?: VNodeChild;
}

export interface FormProps<T = any> extends FormLayoutProps {
  form?: FormInstanceBase;
  style?: StyleValue;
  class?: string;
  layoutClass?: string;
  layoutStyle?: StyleValue;
  /**表单数据*/
  formData?: any;
  /**值更新触发*/
  onValuesChange?: (changedValues: Partial<T>, values: T) => void;
  /**提交保存 验证成功*/
  onFinish?: (values: T) => void;
  /**提交保存 验证失败*/
  onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;
  /**隐藏表单项初始值*/
  hideData?: Record<string, boolean>;
  /**表单名称*/
  name?: string;
  /**隐藏规则校验*/
  hideRuleData?: Record<string, boolean>;
}
