import styled from 'styled-components';

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.purple};
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  margin-top: 10px;
`;

export default Title;
