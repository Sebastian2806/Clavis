import styled, { css } from 'styled-components';

const DotStatus = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 3px 0 0 3px;
  ${({ type, theme }) => {
    if (type === 'take')
      return css`
        background-color: ${theme.colors.error};
      `;
    if (type === 'book')
      return css`
        background-color: ${theme.colors.warning};
      `;
    return css`
      background-color: ${theme.colors.approve};
    `;
  }}
`;

export default DotStatus;
