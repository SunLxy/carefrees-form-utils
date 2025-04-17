import React, { Fragment } from "react"
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

} from "../styles/styles.formItem"

export interface LayoutFormItemProps {
  /**规则校验失败错误提示位置*/
  errorLayout?: 'left-bottom' | "right-bottom" | 'top-right' | 'top-left'
  /**必填样式*/
  required?: boolean
  /**label显示模式*/
  labelMode?: "left" | "top" | "hide";
  /**内容*/
  children?: React.ReactNode
  /**只进行规则样式*/
  onlyRuleStyle?: boolean
  label?: React.ReactNode
  /**底部提示内容*/
  helpText?: React.ReactNode
  /**额外内容*/
  extra?: React.ReactNode
  /**是否显示label后的冒号*/
  showColon?: boolean
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

  htmlFor?: string
  /**规则验证结果*/
  validateResult?: {
    tip: string | (string | undefined)[];
    isInvalid: boolean;
  }
  // 样式部分
  style?: React.CSSProperties
  className?: string
  labelStyle?: React.CSSProperties
  labelClassName?: string
}

const preCls = 'carefrees-form-item'

/**布局组件 表单项*/
export const LayoutFormItem = (props: LayoutFormItemProps) => {
  const {
    children,
    labelMode = 'top',
    onlyRuleStyle,
    label,
    helpText,
    extra,
    showColon = true,
    colSpan = 1,
    rowSpan = 1,
    validateResult,
    htmlFor,
    required,
    errorLayout = 'left-bottom',
    style,
    className,
    labelClassName,
    labelStyle,
  } = props
  const tip = validateResult?.tip
  const isInvalid = validateResult?.isInvalid
  const cls = clx(preCls, className, { 'dx-invalid': !!validateResult?.isInvalid })

  const labelWarpCls = clx(`${preCls}-label-warp`, labelClassName)

  const errorCls = clx(`${preCls}-body-error`, {
    [errorLayout]: !!errorLayout
  })

  return (<FormItemBaseStyled
    style={style}
    className={cls}
    $colSpan={colSpan}
    $rowSpan={rowSpan}
    $onlyRuleStyle={onlyRuleStyle}
  >
    <FormItemContainerBaseStyled $labelMode={labelMode} className={`${preCls}-container`} >
      {label ? <FormItemLabelWarpBaseStyled style={labelStyle} className={labelWarpCls} >
        <FormItemLabelBaseStyled $required={required} $showColon={showColon} htmlFor={htmlFor} className={`${preCls}-label`} >
          {label}
        </FormItemLabelBaseStyled>
      </FormItemLabelWarpBaseStyled> : <Fragment />}
      <FormItemBodyBaseStyled className={`${preCls}-body`}>
        <FormItemBodyInputBaseStyled className={`${preCls}-body-input`}>
          {children}
        </FormItemBodyInputBaseStyled>
        {helpText ? <FormItemBodyHelpBaseStyled className={`${preCls}-body-help`}>
          {helpText}
        </FormItemBodyHelpBaseStyled> : <Fragment />}
        {isInvalid ? <FormItemBodyErrorBaseStyled $layout={errorLayout} className={errorCls}>error</FormItemBodyErrorBaseStyled> : <Fragment />}
      </FormItemBodyBaseStyled>
    </FormItemContainerBaseStyled>
    {extra ? <FormItemExtraBaseStyled className={`${preCls}-extra`}>
      {extra}
    </FormItemExtraBaseStyled> : <Fragment />}
  </FormItemBaseStyled>)
}
