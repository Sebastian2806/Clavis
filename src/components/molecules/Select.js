import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from '../atoms/Label';

const StyledWrapper = styled.div`
  margin: 10px 0;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: ${({ height }) => height};
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.light};
  padding: 0;
  font-size: 15px;
  position: relative;
  z-index: 3;
  outline: none;
  margin: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightpurple};
`;

const StyledOption = styled.option`
  color: #000;
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
