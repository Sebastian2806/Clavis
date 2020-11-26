import React, { useContext } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import IconBox from '../atoms/IconBox';
import { MenuContext } from '../../context/menuContext';

const StyledHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
`;

const StyledTitle = styled.p`
  font-size: 26px;
  margin: 0;
  margin-right: 20px;
`;

const StyledIconBox = styled(IconBox)`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const FiltersHeader = () => {
  const { setIsFiltersOpen } = useContext(MenuContext);
  return (
    <StyledHeaderWrapper>
      <StyledIconBox mode="dark" onClick={() => setIsFiltersOpen(false)}>
        <CloseIcon />
      </StyledIconBox>
      <StyledTitle>Filtry</StyledTitle>
    </StyledHeaderWrapper>
  );
};

export default FiltersHeader;
