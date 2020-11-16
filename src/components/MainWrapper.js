import styled from 'styled-components';

const MainWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.lightpurple};

  @media (min-width: 450px) {
    width: 400px;
    height: 500px;
    border-radius: 10px;
  }
`;

export default MainWrapper;
