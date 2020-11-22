import styled from 'styled-components';

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.lightblue};
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
`;

export default Title;
