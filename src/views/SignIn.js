import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import KeyIcon from '../assets/icon/key.svg';
import Title from '../components/atoms/Title';
import UserSignInForm from '../components/form/UserSignInForm';

const StyledWrapper = styled.div`
  width: 100%;
  height: calc(var(--vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 60px;
  height: 60px;
`;

const StyledFormWrapper = styled.div`
  width: 280px;
  padding: 10px;
`;

const StyledTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.dark};
`;

const SignIn = () => {
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  return (
    <StyledWrapper>
      <StyledContainer>
        {redirectOnLogin && <Redirect to="/" />}
        <StyledHeader>
          <StyledImg src={KeyIcon} alt="" />
          <StyledTitle>Clavis</StyledTitle>
        </StyledHeader>
        <StyledFormWrapper>
          <UserSignInForm setRedirectOnLogin={setRedirectOnLogin} />
        </StyledFormWrapper>
      </StyledContainer>
    </StyledWrapper>
  );
};
export default SignIn;
