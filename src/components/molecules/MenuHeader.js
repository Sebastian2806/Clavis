import React, { useContext } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import Title from '../atoms/Title';
import IconBox from '../atoms/IconBox';
import { MenuContext } from '../../context/menuContext';

const StyledHeader = styled.header`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 60px;

  @media (min-width: 600px) {
    padding: 20px 10px;
  }

  @media (min-width: 900px) {
    display: block;
  }
`;

const StyledTitle = styled(Title)`
  text-align: left;

  @media (min-width: 900px) {
    text-align: center;
  }
`;

const StyledCloseBtn = styled(IconBox)`
  @media (min-width: 900px) {
    display: none;
  }
`;

const MenuHeader = () => {
  const menuContext = useContext(MenuContext);

  return (
    <StyledHeader>
      <StyledTitle>clavis</StyledTitle>
      <StyledCloseBtn type="button" onClick={() => menuContext.setIsMenuOpen(false)} aria-label="Zamknij menu boczne">
        <CloseIcon />
      </StyledCloseBtn>
    </StyledHeader>
  );
};

export default MenuHeader;
