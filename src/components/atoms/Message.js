import styled, { css } from 'styled-components';

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.light};
  font-weight: bold;
  text-align: center;

  ${({ correct }) =>
    correct &&
    css`
      background-color: ${({ theme }) => theme.colors.approve};
    `}

  ${({ error }) =>
    error &&
    css`
      background-color: ${({ theme }) => theme.colors.error};
    `}
`;

export default Message;
