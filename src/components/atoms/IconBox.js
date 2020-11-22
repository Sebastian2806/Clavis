import styled from 'styled-components';

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
  transition: background-color 100ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  & > svg {
    width: 80%;
    height: 80%;
    color: ${({ theme }) => theme.colors.light};
  }
`;

export default IconBox;
