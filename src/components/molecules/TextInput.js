import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TimeField from 'react-simple-timefield';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  height: 45px;
  width: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  z-index: 100;
`;

const TextInput = ({ name, label, error, time, showPassIcon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledWrapper time={time}>
      <Label htmlFor={name} time={time}>
        {label}
      </Label>
      {time ? (
        <TimeField input={<Input id={name} name={name} error={error} time {...props} />} name={name} {...props} />
      ) : (
        <StyledInputWrapper>
          {showPassIcon ? (
            <>
              <Input id={name} name={name} error={error} {...props} type={showPassword ? 'text' : 'password'} />
              <StyledButton type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
                {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </StyledButton>
            </>
          ) : (
            <Input id={name} name={name} error={error} {...props} />
          )}
        </StyledInputWrapper>
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
  showPassIcon: PropTypes.bool,
};

TextInput.defaultProps = {
  time: false,
  error: '',
  showPassIcon: false,
};

export default TextInput;
