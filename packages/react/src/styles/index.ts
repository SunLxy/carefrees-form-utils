import styled, { css } from 'styled-components';

/**表单基础样式组件*/
export const FormBaseStyled = styled.form<{ $bgcolor: string }>`
  box-sizing: border-box;
  --form-color: rgba(0, 0, 0, 0.88);
  --form-header-color: #1d2129;
  --form-font-size: 14px;
  --form-border-color: #e0e0e0;

  html.dark & {
    --form-color: #e3e3e3;
    --form-header-color: #e3e3e3;
    --form-font-size: 14px;
    --form-border-color: #e0e0e0;
  }

  font-size: var(--form-font-size);
  color: var(--form-color, rgba(0, 0, 0, 0.88));

  ${(props) => {
    if (props.$bgcolor) {
      return css`
        background-color: ${props.$bgcolor};
      `;
    }
    return '';
  }}
`;
