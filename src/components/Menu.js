import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import MenuHeader from './molecules/MenuHeader';
import MenuUserInfo from './molecules/MenuUserInfo';
import MenuNavigation from './molecules/MenuNavigation';
import { MenuContext } from '../context/menuContext';

const StyledWrapper = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 300px;
  height: calc(var(--vh) * 100);
  background: ${({ theme }) => theme.colors.darkblue};
  color: ${({ theme }) => theme.colors.light};
  overflow: auto;
  display: flex;
  flex-direction: column;
  transition: transform 150ms ease-out;
  transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 900px) {
    position: fixed;
    transform: translateX(0);
  }
`;

const StyledLine = styled.div`
  width: 80%;
  height: 1px;
  margin: 20px auto 40px;
  background-color: ${({ theme }) => theme.colors.light};
`;

const Menu = () => {
  const menuContext = useContext(MenuContext);

  useEffect(() => {
    return () => {
      menuContext.setIsMenuOpen(false);
    };
  }, []);

  return (
    <>
      <StyledWrapper isMenuOpen={menuContext.isMenuOpen}>
        <MenuHeader />
        <MenuUserInfo />
        <StyledLine />
        <MenuNavigation />
      </StyledWrapper>
    </>
  );
};

export default Menu;
