import React, { Fragment, useMemo, useRef, memo } from 'react';
import { AttrsOptions, useAttrs, AttrsContext } from './../hooks/useAttrs';
import { ViewProps, View, Text } from 'react-native';
import { StylesBase } from '../styles';

export interface FormLayoutProps extends AttrsOptions {
  /**标题*/
  title?: React.ReactNode;
  /**额外内容*/
  extra?: React.ReactNode;
  /**内容*/
  children?: React.ReactNode;
  /**是否占据整行*/
  isAllColSpan?: boolean;
  style?: ViewProps['style'];
  /**头部样式*/
  headerStyle?: ViewProps['style'];
  /**内容样式*/
  bodyStyle?: ViewProps['style'];
  /**是否添加边框*/
  bordered?: boolean;
  /**列数据*/
  colCount?: number;
  /**
   * @description gap 属性是用来设置网格行与列之间的间隙，该属性是row-gap and column-gap的简写形式。
   */
  gap?: string | number;
}

/**布局组件*/
export const FormLayout = memo((props: FormLayoutProps) => {
  const {
    colCount: p_colCount = 4,
    errorLayout: p_errorLayout = 'left-bottom',
    labelMode: p_labelMode = 'left',
    showColon: p_showColon = true,
    formItemStyle: p_formItemStyle,
    formItemLabelStyle: p_formItemLabelStyle,
  } = useAttrs();
  const {
    colCount = p_colCount,
    title,
    extra,
    children,
    isAllColSpan,
    style,
    headerStyle,
    bodyStyle,
    errorLayout = p_errorLayout,
    labelMode = p_labelMode,
    showColon = p_showColon,
    formItemStyle = p_formItemStyle,
    formItemLabelStyle = p_formItemLabelStyle,
    bordered = false,
    gap,
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const value = useMemo(() => {
    return {
      colCount,
      errorLayout,
      labelMode,
      showColon,
      formItemStyle,
      formItemLabelStyle,
    };
  }, [colCount, errorLayout, labelMode, showColon, formItemStyle, formItemLabelStyle]);

  const styleBase = useMemo(() => {
    const css: ViewProps['style'] = {};
    if (typeof gap === 'string') {
      css.gap = Number(gap);
    }
    if (typeof gap === 'number') {
      css.gap = gap;
    }
    return css;
  }, [colCount, gap]);

  const layoutStyle = useMemo(() => {
    return [
      StylesBase['carefrees-form-layout'],
      bordered && StylesBase['carefrees-form-layout.bordered'],
      isAllColSpan && StylesBase.isAllColSpan,
      style,
    ].filter(Boolean);
  }, [bordered, isAllColSpan, style]);

  const headStyle = useMemo(() => {
    return [
      StylesBase['carefrees-form-layout-header'],
      bordered && StylesBase['carefrees-form-layout-header.bordered'],
      headerStyle,
    ].filter(Boolean);
  }, [bordered, headerStyle]);

  return (
    <AttrsContext.Provider value={value}>
      <View style={layoutStyle}>
        {title || extra ? (
          <View style={headStyle}>
            <View>
              <Text style={[StylesBase['carefrees-form-layout-header-title']]}>{title}</Text>
            </View>
            <View>
              <Text style={[StylesBase['carefrees-form-layout-header-extra']]}>{extra}</Text>
            </View>
          </View>
        ) : (
          <Fragment />
        )}
        <View style={[StylesBase['carefrees-form-layout-body'], styleBase, bodyStyle]}>{children}</View>
      </View>
    </AttrsContext.Provider>
  );
});

/**布局组件 占据一整行*/
export const FormLayoutRows = (props: ViewProps) => {
  return <View {...props} style={[props.style, StylesBase.isAllColSpan]} />;
};
