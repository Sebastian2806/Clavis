import React from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  min-width: 120px;
  width: fit-content;
  max-width: 100%;
  padding: 0 10px;
  height: 46px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius};
  transition: background-color 150ms;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.dark};
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.disabled};
  }

  div {
    display: flex;
    justify-content: center;
  }
`;

const Button = ({ children, isLoading, ...rest }) => (
  <StyledButton {...rest}>{isLoading ? <PulseLoader size={11} margin={4} color="#ffffff" /> : children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  isLoading: false,
};

export default Button;
