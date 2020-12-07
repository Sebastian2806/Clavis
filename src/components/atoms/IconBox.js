import styled, { css } from 'styled-components';

const IconBox = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 150ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    ${({ lightHover, theme }) =>
      lightHover &&
      css`
        background-color: ${theme.colors.light};

        & > svg {
          color: ${theme.colors.dark};
        }
      `}
  }

  & > svg {
    width: 80%;
    height: 80%;
    color: ${({ theme }) => theme.colors.light};
  }

  ${({ mode }) =>
    mode === 'dark' &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.dark};
      }

      & > svg {
        color: ${({ theme }) => theme.colors.dark};
      }

      &:hover > svg {
        color: ${({ theme }) => theme.colors.light};
      }
    `}
`;

export default IconBox;
