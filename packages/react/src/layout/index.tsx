import React, { Fragment, useMemo, useRef } from 'react';
import {
  LayoutBaseStyled,
  LayoutHeaderBaseStyled,
  LayoutHeaderExtraBaseStyled,
  LayoutHeaderTextBaseStyled,
} from '../styles/styles.layout';
import clx from 'classnames';
import { AttrsOptions, AttrsContext, useAttrs } from '../hooks/useAttrs';
import { FormLayoutBody, FormLayoutBodyProps } from './layout.body';
export interface FormLayoutProps extends AttrsOptions, FormLayoutBodyProps {
  /**标题*/
  title?: React.ReactNode;
  /**额外内容*/
  extra?: React.ReactNode;
  /**内容*/
  children?: React.ReactNode;
  /**是否占据整行*/
  isAllColSpan?: boolean;
  className?: string;
  /**头部ClassName*/
  headerClassName?: string;
  /**内容ClassName*/
  bodyClassName?: string;
  style?: React.CSSProperties;
  /**头部样式*/
  headerStyle?: React.CSSProperties;
  /**内容样式*/
  bodyStyle?: React.CSSProperties;
  /**是否添加边框*/
  bordered?: boolean;
}

const preCls = 'carefrees-form-layout';

/**布局组件*/
export const FormLayout = React.memo((props: FormLayoutProps) => {
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
    bordered = false,
    gap,
    onResize,
    onGapRow,
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const cls = useMemo(() => clx(preCls, className), [className]);
  const bodyCls = useMemo(() => clx(`${preCls}-body`, bodyClassName), [bodyClassName]);
  const headerCls = useMemo(() => clx(`${preCls}-header`, headerClassName), [headerClassName]);
  const headerTitleCls = useMemo(() => clx(`${preCls}-header-title`), []);
  const headerExtraCls = useMemo(() => clx(`${preCls}-header-extra`), []);

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
    };
  }, [
    colCount,
    errorLayout,
    labelMode,
    showColon,
    formItemClassName,
    formItemStyle,
    formItemLabelClassName,
    formItemLabelStyle,
  ]);

  return (
    <AttrsContext.Provider value={value}>
      <LayoutBaseStyled $bordered={bordered} style={style} className={cls} $isAllColSpan={isAllColSpan}>
        {title || extra ? (
          <LayoutHeaderBaseStyled style={headerStyle} className={headerCls}>
            <LayoutHeaderTextBaseStyled className={headerTitleCls}>{title}</LayoutHeaderTextBaseStyled>
            <LayoutHeaderExtraBaseStyled className={headerExtraCls}>{extra}</LayoutHeaderExtraBaseStyled>
          </LayoutHeaderBaseStyled>
        ) : (
          <Fragment />
        )}
        <FormLayoutBody
          onResize={onResize}
          onGapRow={onGapRow}
          gap={gap}
          style={bodyStyle}
          className={bodyCls}
          colCount={colCount}
        >
          {children}
        </FormLayoutBody>
      </LayoutBaseStyled>
    </AttrsContext.Provider>
  );
});

export interface FormLayoutRowsProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

/**布局组件 占据一整行*/
export const FormLayoutRows = React.forwardRef<HTMLDivElement, FormLayoutRowsProps>((props, ref) => {
  return <LayoutBaseStyled {...props} $isAllColSpan ref={ref} />;
});
