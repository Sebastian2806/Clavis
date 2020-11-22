import styled, { css } from 'styled-components';

const StyledListItem = styled.li`
  height: 60px;
  display: grid;
  grid-template-columns: 30% 1fr;
  justify-items: center;
  align-items: center;
  border-radius: 10px;
  transition: background-color 150ms;
  font-size: 18px;

  & > svg {
    width: 60%;
    height: 60%;
  }

  & > span {
    justify-self: flex-start;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  ${({ active }) =>
    active &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.light};
      background-color: ${({ theme }) => theme.colors.background};
    `}

  ${({ logout }) =>
    logout &&
    css`
      width: 80%;
      cursor: pointer;
      margin: 5px auto 20px;
      border: 2px solid ${({ theme }) => theme.colors.error};
      background-color: ${({ theme }) => theme.colors.error};
      color: ${({ theme }) => theme.colors.light};

      &:hover {
        background-color: ${({ theme }) => theme.colors.errorhover};
      }
    `}
`;

export default StyledListItem;
