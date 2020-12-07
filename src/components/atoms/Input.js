import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input.attrs((props) => ({
  height: props.height || '45px',
}))`
  width: 100%;
  max-width: 275px;
  height: ${({ height }) => height};
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.colors.dark};
  font-size: 19px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radius};
  margin-top: 5px;

  &:hover,
  &:focus {
    background-color: #f2f4f5;
  }

  ${({ error }) =>
    error &&
    css`
      border: 3px solid ${({ theme }) => theme.colors.error};
    `}

  ${({ date }) =>
    date &&
    css`
      max-width: 175px;
      text-align: center;
    `}
`;

const Input = ({ name, textarea, error, ...props }) => {
  return (
    <StyledInput
      name={name}
      id={name}
      as={textarea ? 'textarea' : 'input'}
      height={textarea && 'auto'}
      error={error}
      {...props}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  textarea: PropTypes.bool,
  error: PropTypes.string,
};

Input.defaultProps = {
  textarea: false,
  error: '',
};

export default Input;
