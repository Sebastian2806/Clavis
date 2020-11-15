import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 23px;
  border: 0;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.button};
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export default Button;
