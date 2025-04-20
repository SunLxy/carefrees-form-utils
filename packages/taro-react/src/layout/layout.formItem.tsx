import { View, Label } from '@tarojs/components';
import React, { Fragment, useMemo, memo } from 'react';
import clx from 'classnames';
import { useAttrs } from '../hooks/useAttrs';

export interface LayoutFormItemProps {
  /**规则校验失败错误提示位置*/
  errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
  /**必填样式*/
  required?: boolean;
  /**label显示模式*/
  labelMode?: 'left' | 'top' | 'between' | 'hide';
  /**内容*/
  children?: React.ReactNode;
  /**只进行规则样式*/
  onlyRuleStyle?: boolean;
  label?: React.ReactNode;
  /**底部提示内容*/
  helpText?: React.ReactNode;
  /**额外内容*/
  extra?: React.ReactNode;
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

  htmlFor?: string;
  /**规则验证结果*/
  validateResult?: {
    tip: string | (string | undefined)[];
    isInvalid: boolean;
  };
  // 样式部分
  style?: React.CSSProperties;
  className?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  /**底部边框*/
  inputBordered?: boolean;
}

const preCls = 'carefrees-form-item';
/**布局组件 表单项*/
export const LayoutFormItem = memo((props: LayoutFormItemProps) => {
  const {
    formItemClassName,
    formItemLabelClassName,
    formItemLabelStyle,
    formItemStyle,
    labelMode: p_labelMode = 'top',
    errorLayout: p_errorLayout = 'left-bottom',
    showColon: p_showColon = true,
    colCount = 1,
    inputBordered: p_inputBordered = true,
  } = useAttrs();

  const {
    children,
    labelMode = p_labelMode,
    onlyRuleStyle,
    label,
    helpText,
    extra,
    showColon = p_showColon,
    colSpan = 1,
    rowSpan = 1,
    validateResult,
    htmlFor,
    required,
    errorLayout = p_errorLayout,
    style,
    className,
    labelClassName,
    labelStyle,
    inputBordered = p_inputBordered,
  } = props;
  const tip = validateResult?.tip;
  const isInvalid = !!validateResult?.isInvalid;
  const _errorLayout = labelMode === 'between' ? 'right-bottom' : errorLayout;

  const cls = useMemo(() => clx(preCls, className, formItemClassName, { 'dx-invalid': isInvalid }), [isInvalid]);
  const containerCls = useMemo(() => clx(`${preCls}-container`, { [`${labelMode}`]: !!labelMode }), [labelMode]);
  const labelCls = useMemo(
    () =>
      clx(`${preCls}-label`, {
        required: required,
        'show-colon': showColon && (labelMode === 'left' || labelMode === 'between'),
      }),
    [labelMode, required, showColon],
  );

  const labelWarpCls = useMemo(
    () => clx(`${preCls}-label-warp`, labelClassName, formItemLabelClassName),
    [labelClassName, formItemLabelClassName],
  );

  const inputCls = useMemo(
    () =>
      clx(`${preCls}-body-input`, {
        'input-bordered': inputBordered,
      }),
    [inputBordered],
  );

  const errorCls = useMemo(() => clx(`${preCls}-body-error`, { [_errorLayout]: !!_errorLayout }), [_errorLayout]);
  const _isLabel = useMemo(() => label && labelMode !== 'hide', [label, labelMode]);

  const styleBase = useMemo(() => {
    const css: React.CSSProperties = {};
    if (onlyRuleStyle) {
      css.padding = '0px';
    }
    if (colSpan) {
      const end = colCount > colSpan ? colSpan : colCount;
      css.gridColumnEnd = `span ${end}`;
    }
    if (rowSpan) {
      css.gridRowEnd = `span ${rowSpan}`;
    }
    return css;
  }, [onlyRuleStyle, colSpan, rowSpan, colCount]);

  return (
    <View style={{ ...formItemStyle, ...styleBase, ...style }} className={cls}>
      <View className={containerCls}>
        {_isLabel ? (
          <View style={{ ...formItemLabelStyle, ...labelStyle }} className={labelWarpCls}>
            <Label for={htmlFor} className={labelCls}>
              {label}
            </Label>
          </View>
        ) : (
          <Fragment />
        )}
        <View className={`${preCls}-body`}>
          <View className={inputCls}>{children}</View>
          {helpText ? <View className={`${preCls}-body-help`}>{helpText}</View> : <Fragment />}
          {isInvalid ? <View className={errorCls}>{tip}</View> : <Fragment />}
        </View>
      </View>
      {extra ? <View className={`${preCls}-extra`}>{extra}</View> : <Fragment />}
    </View>
  );
});
