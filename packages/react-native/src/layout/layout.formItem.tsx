import { View, ViewProps, Text } from 'react-native';
import React, { Fragment, useMemo, memo } from 'react';
import { useAttrs } from '../hooks/useAttrs';
import { StylesBase } from '../styles';

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
  htmlFor?: string;
  /**规则验证结果*/
  validateResult?: {
    tip: string | (string | undefined)[];
    isInvalid: boolean;
  };
  // 样式部分
  style?: ViewProps['style'];
  labelStyle?: ViewProps['style'];
  /**底部边框*/
  inputBordered?: boolean;
}

/**布局组件 表单项*/
export const LayoutFormItem = memo((props: LayoutFormItemProps) => {
  const {
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
    validateResult,
    htmlFor,
    required,
    errorLayout = p_errorLayout,
    style,
    labelStyle,
    inputBordered = p_inputBordered,
  } = props;

  const tip = validateResult?.tip;
  const isInvalid = !!validateResult?.isInvalid;
  const _errorLayout = labelMode === 'between' ? 'right-bottom' : errorLayout;
  const _isLabel = useMemo(() => label && labelMode !== 'hide', [label, labelMode]);

  const _isShowColon = useMemo(() => {
    return showColon && (labelMode === 'left' || labelMode === 'between');
  }, [showColon, labelMode]);

  const widthStyles: ViewProps['style'] = useMemo(() => {
    if (colCount >= colSpan) {
      return {
        width: `${(100 / colCount) * colSpan}%`,
      };
    }
    return { width: `100%` };
  }, [colSpan, colCount]);

  const warpStyles = useMemo(() => {
    return [
      StylesBase['carefrees-form-item'],
      onlyRuleStyle && StylesBase['carefrees-form-item.only-rule-style'],
      widthStyles,
      formItemStyle,
      style,
    ].filter(Boolean);
  }, [style, widthStyles, onlyRuleStyle, formItemStyle]);

  const containerStyles = useMemo(() => {
    return [
      StylesBase['carefrees-form-item-container'],
      labelMode === 'left' && StylesBase['carefrees-form-item-container.left'],
      labelMode === 'between' && StylesBase['carefrees-form-item-container.between'],
    ].filter(Boolean);
  }, [labelMode]);

  const labelWarpStyles = useMemo(() => {
    return [
      StylesBase['carefrees-form-item-label-warp'],
      labelMode === 'left' && StylesBase['carefrees-form-item-label-warp.left'],
      (labelMode === 'left' || labelMode == 'between') && StylesBase['carefrees-form-item-label-warp.minHeight'],
      formItemLabelStyle,
      labelStyle,
    ].filter(Boolean);
  }, [labelMode, labelStyle, formItemLabelStyle]);

  const bodyStyles = useMemo(() => {
    return [
      StylesBase['carefrees-form-item-body'],
      labelMode === 'between' && StylesBase['carefrees-form-item-body-com.between'],
    ].filter(Boolean);
  }, [labelMode]);

  const bodyInputStyles = useMemo(() => {
    return [
      StylesBase['carefrees-form-item-body-input'],
      inputBordered && StylesBase['carefrees-form-item-body-input.input-bordered'],
      labelMode === 'between' && StylesBase['carefrees-form-item-body-com.between'],
    ].filter(Boolean);
  }, [labelMode, inputBordered]);

  const errorStyles = useMemo(() => {
    return [
      StylesBase['carefrees-form-item-body-error'],
      _errorLayout && StylesBase[`carefrees-form-item-body-error.${_errorLayout}`],
    ].filter(Boolean);
  }, [_errorLayout]);

  return (
    <View style={warpStyles}>
      <View style={containerStyles}>
        {_isLabel ? (
          <View style={labelWarpStyles}>
            {required ? (
              <View>
                <Text style={[StylesBase.fontSize14, StylesBase['carefrees-form-item-label.required']]}>*</Text>
              </View>
            ) : (
              <Fragment />
            )}
            <View style={StylesBase['carefrees-form-item-label']}>
              {typeof label === 'string' ? <Text style={StylesBase.fontSize14}>{label}</Text> : label}
            </View>
            {_isShowColon ? (
              <View style={[StylesBase['carefrees-form-item-label.show-colon']]}>
                <Text style={StylesBase.fontSize14}>:</Text>
              </View>
            ) : (
              <Fragment />
            )}
          </View>
        ) : (
          <Fragment />
        )}
        <View style={bodyStyles}>
          <View style={bodyInputStyles}>{children}</View>
          {helpText ? (
            <View style={StylesBase['carefrees-form-item-body-help']}>
              {typeof helpText === 'string' ? <Text style={StylesBase.fontSize12}>{helpText}</Text> : helpText}
            </View>
          ) : (
            <Fragment />
          )}
          {isInvalid ? (
            <View style={errorStyles}>
              <Text style={StylesBase['error-text']}>{tip}</Text>
            </View>
          ) : (
            <Fragment />
          )}
        </View>
      </View>
      {extra ? (
        <View style={StylesBase['carefrees-form-item-extra']}>
          {typeof extra === 'string' ? <Text style={StylesBase.fontSize14}>{extra}</Text> : extra}
        </View>
      ) : (
        <Fragment />
      )}
    </View>
  );
});
