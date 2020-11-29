import styled, { css } from 'styled-components';

const FixedMessage = styled.div`
  position: fixed;
  width: fit-content;
  max-width: 100%;
  padding: 10px 30px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  margin: 15px;
  font-size: 19px;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.colors.approve};
  color: ${({ theme }) => theme.colors.light};
  transition: transform 200ms ease-out;
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(150%)')};

  /* ${({ show }) =>
    show &&
    css`
      transform: translateY(0);
    `} */
`;

export default FixedMessage;
