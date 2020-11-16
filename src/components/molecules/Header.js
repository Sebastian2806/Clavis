import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Title from '../atoms/Title';
import LogoutIcon from '../../assets/icon/logout.svg';

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.background};
  height: 50px;
`;

const StyledTitle = styled(Title)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.lightblue};
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 25px;
  height: 25px;
`;

const Header = () => (
  <StyledHeader>
    <StyledTitle>clavis</StyledTitle>
    <StyledLink to="signin" aria-label="Wyloguj się z konta.">
      <StyledImg src={LogoutIcon} alt="" />
    </StyledLink>
  </StyledHeader>
);

export default Header;
