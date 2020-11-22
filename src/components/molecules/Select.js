import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from '../atoms/Label';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 275px;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const StyledSelect = styled.select`
  width: 100%;
  max-width: 275px;
  height: ${({ height }) => height};
  height: 45px;
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.colors.dark};
  font-size: 19px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radius};
  margin-top: 5px;
`;

const StyledOption = styled.option`
  color: #000;
  font-size: 19px;
`;

const Select = ({ data, label, name, ...props }) => {
  return (
    <StyledWrapper>
      <Label htmlFor={name}>{label}</Label>
      <StyledSelect id={name} name={name} {...props}>
        {data.map((el) => (
          <StyledOption key={el.id} value={el.value}>
            {el.label}
          </StyledOption>
        ))}
      </StyledSelect>
    </StyledWrapper>
  );
};

Select.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Select;
