import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import SubTitle from '../atoms/SubTitle';

const StyledContainer = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;

  @media (min-width: 300px) {
    grid-gap: 20px;
  }
`;

const StyledSubTitle = styled(SubTitle)`
  font-size: 18px;
`;

const DateInputs = ({ values, errors, touched, handleChange }) => {
  return (
    <>
      <StyledSubTitle>Początek rezerwacji:</StyledSubTitle>
      <StyledContainer>
        <Field
          as={TextInput}
          name="dateStart"
          label="Data"
          placeholder="DD-MM-YYYY"
          date
          error={errors.dateStart && touched.dateStart ? errors.dateStart : ''}
        />
        <TextInput
          value={values.startAt}
          onChange={handleChange}
          name="startAt"
          aria-label="Początek wynajęcia sali"
          placeholder="np.: 17:35"
          label="Godzina"
          time
        />
      </StyledContainer>
      <StyledSubTitle>Koniec rezerwacji:</StyledSubTitle>
      <StyledContainer>
        <Field
          as={TextInput}
          name="dateEnd"
          label="Data"
          placeholder="DD-MM-YYYY"
          date
          error={errors.dateEnd && touched.dateEnd ? errors.dateEnd : ''}
        />
        <TextInput
          value={values.endAt}
          onChange={handleChange}
          name="endAt"
          aria-label="Koniec wynajęcia sali"
          placeholder="np.: 19:05"
          label="Godzina"
          time
        />
      </StyledContainer>
    </>
  );
};

DateInputs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    dateStart: PropTypes.string.isRequired,
    dateEnd: PropTypes.string.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    startAt: PropTypes.string,
    endAt: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    dateStart: PropTypes.bool,
    dateEnd: PropTypes.bool,
    startAt: PropTypes.bool,
    endAt: PropTypes.bool,
  }).isRequired,
};

export default DateInputs;
