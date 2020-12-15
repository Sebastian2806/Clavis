import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from '../atoms/Button';
import Message from '../atoms/Message';
import { FetchContext } from '../../context/fetchContext';
import DateInputs from '../molecules/DateInputs';
import { isSameOrBefore, formatDate } from '../../util/helpers';
import ReservationSchema from '../../schemas/ReservationSchema';
import { useDate } from '../../hooks/useDate';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFrom = styled(Form)`
  width: 100%;

  @media (min-width: 500px) {
    width: 70%;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const StyledDateTimeContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  &::first-child {
    background-color: red;
  }
`;

const StyledContainer = styled.div`
  padding: 15px 0;
`;

const ReservationForm = ({ id }) => {
  const [isError, setIsError] = useState({ is: false, msg: 'Wystąpił błąd podczas rezerwacji.' });
  const [isCorrect, setIsCorrect] = useState(false);
  const [redirectOnReservation, setRedirectOnReservation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchContext = useContext(FetchContext);
  const [dateObj] = useDate();

  return (
    <FormContainer>
      {redirectOnReservation && <Redirect to="/findclassroom" />}
      <Formik
        validationSchema={ReservationSchema}
        initialValues={{
          ...dateObj,
        }}
        onSubmit={async (values, { setErrors }) => {
          const formattedDate = formatDate(values);

          setIsCorrect(false);
          setIsError({ is: false, msg: 'Wystąpił błąd podczas rezerwacji.' });
          setIsLoading(true);

          if (!isSameOrBefore(formattedDate.startAt, formattedDate.endAt)) {
            setErrors({ startAt: 'Data zakończenia jest mniejsza niż rozpoczęcia' });
            setIsLoading(false);
            return;
          }

          try {
            await fetchContext.authAxios.post(`classroom/${id}/confirm`, formattedDate);
            setIsCorrect(true);
            setTimeout(() => setRedirectOnReservation(true), 1000);
          } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
              setIsError({ is: true, msg: 'Sala jest zajęta w danym czasie.' });
            } else {
              setIsError({ is: true, msg: 'Wystąpił błąd podczas rezerwacji.' });
            }
            setIsLoading(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <StyledFrom autoComplete="off">
            <StyledDateTimeContainer>
              <DateInputs values={values} errors={errors} touched={touched} handleChange={handleChange} />
              {(isError.is || isCorrect || errors.startAt) && (
                <StyledContainer>
                  <Message error={isError.is || errors.startAt} correct={isCorrect}>
                    {isError.is || errors.startAt ? errors.startAt || isError.msg : 'Sala zarezerwowana pomyślnie.'}
                  </Message>
                </StyledContainer>
              )}
            </StyledDateTimeContainer>
            <StyledButton isLoading={isLoading} disabled={isLoading} aria-label="Zarezerwuj salę">
              Zarezerwuj
            </StyledButton>
          </StyledFrom>
        )}
      </Formik>
    </FormContainer>
  );
};

ReservationForm.propTypes = {
  id: PropTypes.string,
};

ReservationForm.defaultProps = {
  id: '',
};

export default ReservationForm;
