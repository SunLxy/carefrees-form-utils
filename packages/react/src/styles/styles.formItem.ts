import styled, { css } from "styled-components";

/**表单项 label 样式基础组件*/
export const FormItemLabelBaseStyled = styled.label<{ $required?: boolean, $showColon?: boolean }>`
  box-sizing: border-box;
  position: relative;
  font-size: 14px;
  color: rgba(0,0,0,0.88);
  ${props => props.$showColon ? css`
    &::after{
      content: ":";
      display: inline-block;
      text-align: center;
      margin: 0;
      margin-inline-end: 2px;
      margin-inline-start: 2px;
    }
  `: ""}
  ${({ $required }) => $required ? css`
    &::before{
      content: "*";
      color: red;
      display: inline-block;
      margin-inline-end: 4px;
    }
  `: ""}
`
/**表单项 label 外层 样式基础组件*/
export const FormItemLabelWarpBaseStyled = styled.div`

`


/**表单项 body input 组件*/
export const FormItemBodyInputBaseStyled = styled.div`
  width: 100%;
`

/**表单项 body 样式基础组件*/
export const FormItemBodyBaseStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
`

/**表单项 body error 提示组件*/
export const FormItemBodyErrorBaseStyled = styled.div<{ $layout?: "left-bottom" | "right-bottom" | "top-right" | "top-left" }>`
  position:absolute;
  width: 100%;
  color: red;
  top: auto;
  left: 0;
  right: 0;
  bottom: -16px;
  padding-top: 2px;
  font-size: 12px;
  box-sizing: border-box;
  z-index: 10;
  pointer-events: none;
  display: flex;
  flex-direction: row;
  justify-content: start;
  ${props => props.$layout === 'right-bottom' && css`
      justify-content: end;
      top: auto;
      left: 0;
      right: 0;
      bottom: -16px;
  `}  
  ${props => props.$layout === "top-left" && css`
      justify-content: start;
      top: -16px;
      left: 0px;
      right: 0px;
      bottom: auto;
  `}  
  ${props => props.$layout === 'top-right' && css`
      justify-content: end;
      top: -16px;
      left: 0px;
      right: 0px;
      bottom: auto;
  `}  
`

/**表单项提示样式基础组件*/
export const FormItemBodyHelpBaseStyled = styled.div`
  width: 100%;
`

/**表单项 extra 样式基础组件*/
export const FormItemExtraBaseStyled = styled.div`

`

/**表单项容器样式基础组件*/
export const FormItemContainerBaseStyled = styled.div<{ $labelMode?: "left" | "top" | "hide"; }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${props => {
    if (props.$labelMode === 'left') {
      return css`
        flex-direction: row;
        gap: 12px;
      `
    }
    return ''
  }}
  @media (max-width: 576px) {
    && {
      flex-direction: column;
      gap: 4px;
    }
  }
`

/**表单项样式基础组件*/
export const FormItemBaseStyled = styled.div<{
  $colSpan?: number
  $rowSpan?: number
  $onlyRuleStyle?: boolean
}>`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 12px;
  box-sizing: border-box;
  color: rgba(0,0,0,0.88);
  ${props => props.$onlyRuleStyle && css`
    padding: 0px;
  `}
  ${(props) => {
    const { $colSpan } = props;
    if ($colSpan) {
      return css`
        grid-column-end: span ${$colSpan};
      `
    }
    return ''
  }}
  ${(props) => {
    const { $rowSpan } = props;
    if ($rowSpan) {
      return css`
        grid-row-end: span ${$rowSpan};
      `
    }
    return ''
  }}

`