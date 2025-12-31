import React, { Fragment, useMemo, useRef, memo } from 'react';
import { View, ViewProps } from '@tarojs/components';
import clx from 'classnames';
import { AttrsOptions, AttrsContext, useAttrs } from '@carefrees/form-utils-react-hooks';

export interface FormLayoutProps extends AttrsOptions {
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
  /**列数据*/
  colCount?: number;
  /**
   * @description gap 属性是用来设置网格行与列之间的间隙，该属性是row-gap and column-gap的简写形式。
   */
  gap?: string | number;
  /**是否添加输入框边框*/
  inputBordered?: boolean;
}

const preCls = 'carefrees-form-layout';

/**布局组件*/
export const FormLayout = memo((props: FormLayoutProps) => {
  const {
    colCount: p_colCount = 4,
    errorLayout: p_errorLayout = 'left-bottom',
    labelMode: p_labelMode = 'left',
    showColon: p_showColon = true,
    formItemClassName: p_formItemClassName,
    formItemStyle: p_formItemStyle,
    formItemLabelClassName: p_formItemLabelClassName,
    formItemLabelStyle: p_formItemLabelStyle,
    inputBordered: p_inputBordered,
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
    inputBordered = p_inputBordered,
    gap,
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const cls = useMemo(
    () =>
      clx(preCls, className, {
        'all-colspan': isAllColSpan,
        bordered: bordered,
      }),
    [className],
  );

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
      inputBordered,
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
    inputBordered,
  ]);
  const styleBase = useMemo(() => {
    const css: React.CSSProperties = {};
    if (typeof gap === 'string') {
      css.gap = gap;
    }
    if (typeof gap === 'number') {
      css.gap = `${gap}px`;
    }
    if (colCount) {
      css.gridTemplateColumns = `repeat(${colCount}, auto)`;
    }
    return css;
  }, [colCount, gap]);

  return (
    <AttrsContext.Provider value={value}>
      <View style={style} className={cls}>
        {title || extra ? (
          <View style={headerStyle} className={headerCls}>
            <View className={headerTitleCls}>{title}</View>
            <View className={headerExtraCls}>{extra}</View>
          </View>
        ) : (
          <Fragment />
        )}
        <View style={{ ...styleBase, ...bodyStyle }} className={bodyCls}>
          {children}
        </View>
      </View>
    </AttrsContext.Provider>
  );
});

/**布局组件 占据一整行*/
export const FormLayoutRows = (props: ViewProps) => {
  const { className } = props;
  const cls = useMemo(
    () =>
      clx(preCls, className, {
        'all-colspan': true,
      }),
    [className],
  );
  return <View {...props} className={cls} />;
};
