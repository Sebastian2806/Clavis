import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  position: relative;
  margin-top: 3px;
`;

const StyledUnderline = styled.div`
  &::before,
  &::after {
    content: '';
    left: 0;
    top: 95%;
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }

  &::after {
    transform: scaleX(0);
    background-color: ${({ theme }) => theme.colors.light};
    transition: transform 150ms;
  }
`;

const StyledInput = styled.input.attrs((props) => ({
  height: props.height || '30px',
}))`
  width: 100%;
  height: ${({ height }) => height};
  background: transparent;
  border: 0;
  /* color: ${({ theme }) => theme.colors.light}; */
  padding: 0;
  font-size: 15px;
  position: relative;
  z-index: 3;
  outline: none;

  &:focus + div::after {
    transform: scaleX(1);
  }
`;

const Input = ({ name, textarea, ...props }) => {
  return (
    <StyledWrapper>
      <StyledInput name={name} id={name} as={textarea ? 'textarea' : 'input'} height={textarea && 'auto'} {...props} />
      <StyledUnderline />
    </StyledWrapper>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  textarea: PropTypes.bool,
};

Input.defaultProps = {
  textarea: false,
};

export default Input;
