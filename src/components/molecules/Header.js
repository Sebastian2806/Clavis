import React, { useContext } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import Title from '../atoms/Title';
import IconBox from '../atoms/IconBox';
import { MenuContext } from '../../context/menuContext';

const StyledHeader = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.darkblue};
  margin-left: 10px;
`;

const StyledMenuButton = styled(IconBox)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }

  & > svg {
    width: 70%;
    height: 70%;
    color: ${({ theme }) => theme.colors.darkblue};
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const Header = () => {
  const menuContext = useContext(MenuContext);

  return (
    <StyledHeader>
      <StyledMenuButton onClick={() => menuContext.setIsMenuOpen(true)} aria-label="Otwórz menu boczne">
        <MenuIcon />
      </StyledMenuButton>
      <StyledTitle>clavis</StyledTitle>
    </StyledHeader>
  );
};

export default Header;
