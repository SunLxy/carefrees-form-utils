import React, { Fragment, useMemo } from 'react';
import clx from 'classnames';

import {
  FormItemBaseStyled,
  FormItemContainerBaseStyled,
  FormItemLabelBaseStyled,
  FormItemBodyBaseStyled,
  FormItemBodyInputBaseStyled,
  FormItemBodyErrorBaseStyled,
  FormItemExtraBaseStyled,
  FormItemBodyHelpBaseStyled,
  FormItemLabelWarpBaseStyled,
} from '../styles/styles.formItem';
import { useAttrs } from '../hooks/useAttrs';

export interface LayoutFormItemProps {
  /**规则校验失败错误提示位置*/
  errorLayout?: 'left-bottom' | 'right-bottom' | 'top-right' | 'top-left';
  /**必填样式*/
  required?: boolean;
  /**label显示模式*/
  labelMode?: 'left' | 'top' | 'hide';
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
}

const preCls = 'carefrees-form-item';

/**布局组件 表单项*/
export const LayoutFormItem = React.memo((props: LayoutFormItemProps) => {
  const {
    formItemClassName,
    formItemLabelClassName,
    formItemLabelStyle,
    formItemStyle,
    labelMode: p_labelMode = 'top',
    errorLayout: p_errorLayout = 'left-bottom',
    showColon: p_showColon = true,
    colCount = 4,
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
  } = props;
  const tip = validateResult?.tip;
  const isInvalid = !!validateResult?.isInvalid;

  const cls = useMemo(() => clx(preCls, className, formItemClassName, { 'dx-invalid': isInvalid }), [isInvalid]);

  const labelWarpCls = useMemo(
    () => clx(`${preCls}-label-warp`, labelClassName, formItemLabelClassName),
    [labelClassName, formItemLabelClassName],
  );
  const errorCls = useMemo(() => clx(`${preCls}-body-error`, { [errorLayout]: !!errorLayout }), [errorLayout]);

  const _showColon = useMemo(() => showColon && labelMode === 'left', [showColon, labelMode]);
  const _isLabel = useMemo(() => label && labelMode !== 'hide', [label, labelMode]);

  return (
    <FormItemBaseStyled
      style={{ ...style, ...formItemStyle }}
      className={cls}
      $colSpan={colSpan}
      $rowSpan={rowSpan}
      $onlyRuleStyle={onlyRuleStyle}
      $colCount={colCount}
    >
      <FormItemContainerBaseStyled $labelMode={labelMode} className={`${preCls}-container`}>
        {_isLabel ? (
          <FormItemLabelWarpBaseStyled style={{ ...labelStyle, ...formItemLabelStyle }} className={labelWarpCls}>
            <FormItemLabelBaseStyled
              $required={required}
              $showColon={_showColon}
              htmlFor={htmlFor}
              className={`${preCls}-label`}
            >
              {label}
            </FormItemLabelBaseStyled>
          </FormItemLabelWarpBaseStyled>
        ) : (
          <Fragment />
        )}
        <FormItemBodyBaseStyled className={`${preCls}-body`}>
          <FormItemBodyInputBaseStyled className={`${preCls}-body-input`}>{children}</FormItemBodyInputBaseStyled>
          {helpText ? (
            <FormItemBodyHelpBaseStyled className={`${preCls}-body-help`}>{helpText}</FormItemBodyHelpBaseStyled>
          ) : (
            <Fragment />
          )}
          {isInvalid ? (
            <FormItemBodyErrorBaseStyled $layout={errorLayout} className={errorCls}>
              {tip}
            </FormItemBodyErrorBaseStyled>
          ) : (
            <Fragment />
          )}
        </FormItemBodyBaseStyled>
      </FormItemContainerBaseStyled>
      {extra ? <FormItemExtraBaseStyled className={`${preCls}-extra`}>{extra}</FormItemExtraBaseStyled> : <Fragment />}
    </FormItemBaseStyled>
  );
});
