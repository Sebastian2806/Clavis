import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { AuthContext } from '../context/authContext';
import ViewWrapper from '../components/atoms/ViewWrapper';
import ViewTitle from '../components/atoms/ViewTitle';
import { keysIssued } from '../data';
import Content from '../components/molecules/Home';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 0 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledBox = styled.div`
  @media (max-width: 550px) {
    width: 100%;
    max-width: 350px;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.hidemenu}), (min-width: 550px) {
    grid-template-columns: minmax(500px, 650px);
  }

  @media (min-width: 1150px) {
    grid-template-columns: repeat(2, minmax(400px, 600px));
  }

  ${({ role }) =>
    role === 'user' &&
    css`
      @media (min-width: 1150px) {
        grid-template-columns: 550px;
      }
    `}
`;

const Home = () => {
  const authContext = useContext(AuthContext);
  const [data] = useState(keysIssued);

  return (
    <ViewWrapper>
      <StyledWrapper>
        <StyledBox>
          <StyledHeader>
            <ViewTitle>Panel główny</ViewTitle>
          </StyledHeader>
          <StyledGrid role={authContext.authState.user.role}>
            {authContext.authState.user.role === 'user' ? (
              <Content data={data} type="reservation" />
            ) : (
              <>
                <Content data={data} type="issue" />
                <Content data={data} />
              </>
            )}
          </StyledGrid>
        </StyledBox>
      </StyledWrapper>
    </ViewWrapper>
  );
};
export default Home;
