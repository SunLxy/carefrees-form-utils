import styled, { css } from 'styled-components';

/**布局 内容 样式基础组件*/
export const LayoutBodyBaseStyled = styled.div<{ $colCount?: number; $gap?: string | number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 2px;
  padding-left: 2px;
  padding-right: 2px;
  box-sizing: border-box;
  ${(props) => {
    if (props.$colCount) {
      return css`
        grid-template-columns: repeat(${props.$colCount}, auto);
      `;
    }
    return '';
  }}
  ${(props) => {
    if (typeof props.$gap === 'number') {
      return css`
        gap: ${props.$gap}px;
      `;
    }
    if (props.$gap) {
      return css`
        gap: ${props.$gap};
      `;
    }
    return '';
  }}
`;
/**布局 头部 样式基础组件*/
export const LayoutHeaderExtraBaseStyled = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
  box-sizing: border-box;
`;

/**布局 标题 样式基础组件*/
export const LayoutHeaderTextBaseStyled = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1d2129;
  box-sizing: border-box;
`;

/**布局 额外内容 样式基础组件*/
export const LayoutHeaderBaseStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid #e0e0e0;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-block-end: 4px;
  padding-inline-start: 2px;
  padding-inline-end: 2px;
  box-sizing: border-box;
`;

/**布局 样式基础组件*/
export const LayoutBaseStyled = styled.div<{ $isAllColSpan?: boolean; $bordered?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding-bottom: 8px;
  position: relative;
  ${(props) => {
    if (props.$isAllColSpan) {
      return css`
        grid-column: 1 / -1;
      `;
    }
    return '';
  }}
  ${(props) => {
    if (props.$bordered) {
      return css`
        border: 1px solid #e0e0e0;
        ${LayoutHeaderBaseStyled} {
          padding-inline-start: 8px;
          padding-inline-end: 8px;
        }
      `;
    }
    return '';
  }}
`;
