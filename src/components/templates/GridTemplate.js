import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.section`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(1, minmax(220px, 300px));
  grid-gap: 15px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(220px, 300px));
  }

  @media (min-width: 725px) {
    grid-template-columns: repeat(3, minmax(220px, 300px));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.hidemenu}) {
    grid-template-columns: repeat(2, minmax(220px, 300px));
  }

  @media (min-width: 1050px) {
    grid-template-columns: repeat(3, minmax(220px, 300px));
  }

  @media (min-width: 1270px) {
    grid-template-columns: repeat(4, minmax(220px, 300px));
  }

  ${({ areFiltersApplied }) =>
    areFiltersApplied &&
    css`
      grid-template-columns: repeat(1, minmax(200px, 300px));

      @media (min-width: 450px) {
        grid-template-columns: repeat(2, minmax(200px, 300px));
      }

      @media (min-width: 670px) {
        grid-template-columns: repeat(3, minmax(200px, 300px));
      }

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, minmax(200px, 300px));
      }

      @media (min-width: 1300px) {
        grid-template-columns: repeat(3, minmax(200px, 300px));
      }
    `}
`;

const GridTemplate = ({ children, areFiltersApplied }) => (
  <StyledGrid areFiltersApplied={areFiltersApplied}>{children}</StyledGrid>
);

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  areFiltersApplied: PropTypes.bool,
};

GridTemplate.defaultProps = {
  areFiltersApplied: false,
};

export default GridTemplate;
