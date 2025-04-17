import React, { Fragment, useMemo } from "react"
import { LayoutBaseStyled, LayoutBodyBaseStyled, LayoutHeaderBaseStyled, LayoutHeaderExtraBaseStyled, LayoutHeaderTextBaseStyled } from "../styles/styles.layout"
import clx from 'classnames';
import { AttrsOptions, AttrsContext, useAttrs } from "../hooks/useAttrs"

export interface FormLayoutProps extends AttrsOptions {
  /**列数据*/
  colCount?: number
  /**标题*/
  title?: React.ReactNode
  /**额外内容*/
  extra?: React.ReactNode
  /**内容*/
  children?: React.ReactNode
  /**是否占据整行*/
  isAllColSpan?: boolean

  className?: string
  /**头部ClassName*/
  headerClassName?: string
  /**内容ClassName*/
  bodyClassName?: string

  style?: React.CSSProperties
  /**头部样式*/
  headerStyle?: React.CSSProperties
  /**内容样式*/
  bodyStyle?: React.CSSProperties

}

const preCls = 'carefrees-form-layout'

/**布局组件*/
export const FormLayout = (props: FormLayoutProps) => {

  const {
    colCount: p_colCount = 4,
    errorLayout: p_errorLayout = 'left-bottom',
    labelMode: p_labelMode = 'left',
    showColon: p_showColon = true,
    formItemClassName: p_formItemClassName,
    formItemStyle: p_formItemStyle,
    formItemLabelClassName: p_formItemLabelClassName,
    formItemLabelStyle: p_formItemLabelStyle,
  } = useAttrs();

  const {
    colCount = p_colCount,
    title,
    extra,
    children,
    isAllColSpan,
    className,
    headerClassName,
    bodyClassName,
    style,
    headerStyle,
    bodyStyle,
    errorLayout = p_errorLayout,
    labelMode = p_labelMode,
    showColon = p_showColon,
    formItemClassName = p_formItemClassName,
    formItemStyle = p_formItemStyle,
    formItemLabelClassName = p_formItemLabelClassName,
    formItemLabelStyle = p_formItemLabelStyle,
  } = props

  const cls = clx(preCls, className, {})
  const bodyCls = clx(`${preCls}-body`, bodyClassName, {})
  const headerCls = clx(`${preCls}-header`, headerClassName, {})
  const headerTitleCls = clx(`${preCls}-header-title`, {})
  const headerExtraCls = clx(`${preCls}-header-extra`, {})

  const value = useMemo(() => {
    return {
      colCount,
      errorLayout,
      labelMode,
      showColon,
      formItemClassName,
      formItemStyle,
      formItemLabelClassName,
      formItemLabelStyle,
    }
  }, [colCount, errorLayout, labelMode, showColon, formItemClassName, formItemStyle, formItemLabelClassName, formItemLabelStyle])

  return <AttrsContext.Provider value={value}>
    <LayoutBaseStyled style={style} className={cls} $isAllColSpan={isAllColSpan} >
      {(title || extra) ? <LayoutHeaderBaseStyled style={headerStyle} className={headerCls}>
        <LayoutHeaderTextBaseStyled className={headerTitleCls}>{title}</LayoutHeaderTextBaseStyled>
        <LayoutHeaderExtraBaseStyled className={headerExtraCls} >{extra}</LayoutHeaderExtraBaseStyled>
      </LayoutHeaderBaseStyled> : <Fragment />}
      <LayoutBodyBaseStyled style={bodyStyle} className={bodyCls} $colCount={colCount} >
        {children}
      </LayoutBodyBaseStyled>
    </LayoutBaseStyled>
  </AttrsContext.Provider>
}

export interface FormLayoutRowsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

/**布局组件 占据一整行*/
export const FormLayoutRows = React.forwardRef<HTMLDivElement, FormLayoutRowsProps>((props, ref) => {
  return <LayoutBaseStyled {...props} $isAllColSpan ref={ref} />
})