import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TimeField from 'react-simple-timefield';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const StyledWrapper = styled.div`
  width: ${({ time }) => (time ? 'fit-content' : '100%')};
  max-width: 275px;
  display: flex;
  flex-direction: column;
  margin: 3px 0;
`;

const StyledErrorMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
  margin-top: 2px;
  height: 16px;
  text-align: right;
`;

const StyledInput = styled.input`
  width: 80px;
  height: 45px;
  text-align: center;
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.colors.dark};
  font-size: 19px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radius};

  &:hover,
  &:focus {
    background-color: #f2f4f5;
  }
`;

const TextInput = ({ name, label, error, time, ...props }) => {
  return (
    <StyledWrapper time={time}>
      <Label htmlFor={name} time={time}>
        {label}
      </Label>
      {time ? (
        <TimeField input={<StyledInput type="text" />} name={name} {...props} />
      ) : (
        <Input id={name} name={name} error={error} {...props} />
      )}

      <StyledErrorMessage>{error}</StyledErrorMessage>
    </StyledWrapper>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  time: PropTypes.bool,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  time: false,
  error: '',
};

export default TextInput;
