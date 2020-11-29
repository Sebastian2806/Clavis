import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  height: ${({ height }) => height}px;
  border-radius: ${({ theme }) => theme.radius};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GridElContainer = ({ children, height }) => {
  return <StyledWrapper height={height}>{children}</StyledWrapper>;
};

GridElContainer.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
};

GridElContainer.defaultProps = {
  height: 100,
};

export default GridElContainer;
