import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledListItem = styled.li`
  display: 'flex';
  align-items: center;
  margin: ${({ isListItem }) => (isListItem ? '0' : '10px 0')};
  position: relative;
`;

const StyledInput = styled.input`
  width: 25px;
  height: 25px;
  margin: 0;
  border-radius: 3px;

  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:checked + label > svg {
    /* path {
      stroke-dashoffset: 320;
    } */
    polyline {
      stroke-dashoffset: 0;
    }
  }

  &:focus + label {
    outline: 1px solid #000;
  }
`;

const StyledSvg = styled.svg`
  width: 25px;
  height: 25px;
  stroke-width: 12;
  fill: none;

  /* & > path {
    stroke-dasharray: 320;
    stroke-dashoffset: 0;
    fill: ${({ theme }) => theme.colors.light};
    transition: stroke-dashoffset 0.3s linear;
  } */

  & > polyline {
    stroke-dasharray: 70;
    stroke-dashoffset: 70;
    fill: none;
    transition: stroke-dashoffset 0.3s ease-in-out;
  }

  ${({ type, theme }) => {
    if (type === 'take')
      return css`
        stroke: ${theme.colors.error};
      `;
    if (type === 'book')
      return css`
        stroke: ${theme.colors.warning};
      `;
    if (type === 'free')
      return css`
        stroke: ${theme.colors.approve};
      `;
    return css`
      stroke: ${theme.colors.dark};
    `;
  }}
`;

const StyledLabel = styled.label`
  cursor: pointer;
  user-select: none;
  font-size: 18px;
  display: flex;
  align-items: center;

  ${({ isListItem }) =>
    isListItem &&
    css`
      width: fit-content;
      margin: 0 auto;
    `}

  & span {
    margin-left: 5px;
  }
`;

const Checkbox = ({ label, value, isListItem, ...rest }) => {
  return (
    <StyledListItem as={isListItem ? 'span' : 'li'} isListItem={isListItem}>
      <StyledInput id={value} value={value} {...rest} />
      <StyledLabel htmlFor={value} isListItem={isListItem}>
        <StyledSvg viewBox="0 0 100 100" type={value}>
          <path d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z" />
          <polyline points="25.5,53.5 39.5,67.5 72.5,34.5 " />
        </StyledSvg>
        <span>{label}</span>
      </StyledLabel>
    </StyledListItem>
  );
};

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  isListItem: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: '',
  isListItem: true,
};

export default Checkbox;
