import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.section`
  border-radius: ${({ theme }) => theme.radius};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 20px;
`;

const CardWrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

CardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardWrapper;
