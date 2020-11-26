import React, { useContext } from 'react';
import styled from 'styled-components';
import { MenuContext } from '../../context/menuContext';

const StyledBackground = styled.div`
  width: 100%;
  height: calc(var(--vh) * 100);
  background-color: #000;
  opacity: 0.6;
  z-index: 9999;
  top: 0;
  left: 0;
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Background = () => {
  const menuContext = useContext(MenuContext);

  return (
    <StyledBackground
      isOpen={menuContext.isMenuOpen || menuContext.isFiltersOpen}
      onClick={() => {
        menuContext.setIsMenuOpen(false);
        menuContext.setIsFiltersOpen(false);
      }}
    />
  );
};

export default Background;
