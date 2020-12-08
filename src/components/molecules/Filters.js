import React, { useContext } from 'react';
import styled from 'styled-components';
import FiltersHeader from './FiltersHeader';
import { MenuContext } from '../../context/menuContext';
import FiltersForm from '../form/FiltersForm';

const StyledWrapper = styled.div`
  width: 250px;
  top: 0;
  right: 0;
  border-left: 3px solid ${({ theme }) => theme.colors.dark};
  padding: 10px;
  min-height: calc(var(--vh) * 100);
  transition: transform 150ms ease-out;
  position: fixed;
  z-index: 10000;
  background-color: ${({ theme }) => theme.colors.light};
  transform: ${({ isFiltersOpen }) => (isFiltersOpen ? 'translateX(0)' : 'translateX(100%)')};

  @media (min-width: 1000px) {
    position: static;
    transform: translateX(0);
  }
`;

const Filters = () => {
  const { isFiltersOpen } = useContext(MenuContext);

  return (
    <StyledWrapper isFiltersOpen={isFiltersOpen}>
      <FiltersHeader />
      <FiltersForm />
    </StyledWrapper>
  );
};

export default Filters;
