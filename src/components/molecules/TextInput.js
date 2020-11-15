import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const StyledWrapper = styled.div`
  margin: 10px 0;
`;

const TextInput = ({ name, label, ...props }) => {
  return (
    <StyledWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
    </StyledWrapper>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
