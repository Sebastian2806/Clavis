import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledGrid = styled.section`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(1, minmax(200px, 300px));
  grid-gap: 15px;

  @media (min-width: 450px) {
    grid-template-columns: repeat(2, minmax(200px, 300px));
  }

  @media (min-width: 670px) {
    grid-template-columns: repeat(3, minmax(200px, 300px));
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(200px, 300px));
  }

  @media (min-width: 1070px) {
    grid-template-columns: repeat(3, minmax(200px, 300px));
  }
`;

const GridTemplate = ({ children }) => <StyledGrid>{children}</StyledGrid>;

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridTemplate;
