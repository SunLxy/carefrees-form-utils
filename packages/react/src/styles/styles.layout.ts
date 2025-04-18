import styled, { css } from 'styled-components';

/**布局 样式基础组件*/
export const LayoutBaseStyled = styled.div<{ $isAllColSpan?: boolean }>`
  width: 100%;
  ${(props) => {
    if (props.$isAllColSpan) {
      return css`
        grid-column: 1 / -1;
      `;
    }
    return '';
  }}
`;

/**布局 内容 样式基础组件*/
export const LayoutBodyBaseStyled = styled.div<{ $colCount?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 2px;
  ${(props) => {
    if (props.$colCount) {
      return css`
        grid-template-columns: repeat(${props.$colCount}, auto);
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
`;

/**布局 标题 样式基础组件*/
export const LayoutHeaderTextBaseStyled = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1d2129;
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
  margin-block-end: 8px;
  padding-inline-start: 2px;
  padding-inline-end: 2px;
  box-sizing: border-box;
`;
