import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextInput from '../molecules/TextInput';
import Button from '../atoms/Button';
import Message from '../atoms/Message';
import { FetchContext } from '../../context/fetchContext';
import { isSameOrBefore, getCurrentTime, getCurrentDate, addTime } from '../../util/helpers';

const StyledTimeBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const StyledTimeSpan = styled.span`
  font-size: 45px;
  padding: 0 12px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFrom = styled(Form)`
  width: fit-content;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const StyledDateTimeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledContainer = styled.div`
  padding: 15px 0;
`;

const ReservationSchema = Yup.object().shape({
  date: Yup.string()
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i,
      'Data jest niepoprawna',
    )
    .required('Pole wymagane'),
  startAt: Yup.string()
    .test('startAt_test', 'Godzina początkowa musi być przed końcową', function (value) {
      const { endAt } = this.parent;
      return isSameOrBefore(value, endAt);
    })
    .required('Pole wymagane'),
  endAt: Yup.string().required('Pole wymagane'),
});

const ReservationForm = ({ id }) => {
  const [isError, setIsError] = useState({ is: false, msg: 'Wystąpił błąd podczas rezerwacji.' });
  const [isCorrect, setIsCorrect] = useState(false);
  const [redirectOnReservation, setRedirectOnReservation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime] = useState(() => getCurrentTime());
  const fetchContext = useContext(FetchContext);

  return (
    <FormContainer>
      {redirectOnReservation && <Redirect to="/findclassroom" />}
      <Formik
        validationSchema={ReservationSchema}
        initialValues={{
          date: getCurrentDate(),
          startAt: currentTime,
          endAt: addTime(currentTime),
        }}
        onSubmit={async ({ date, startAt, endAt }) => {
          const formattedDate = {
            startAt: `${date.split('-').reverse().join('-')} ${startAt}`,
            endAt: `${date.split('-').reverse().join('-')} ${endAt}`,
          };
          setIsCorrect(false);
          setIsError({ is: false, msg: 'Wystąpił błąd podczas rezerwacji.' });
          setIsLoading(true);

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
              <Field
                as={TextInput}
                name="date"
                label="Dzień"
                placeholder="DD-MM-YYYY"
                date
                error={errors.date && touched.date ? errors.date : ''}
              />
              <StyledTimeBox>
                <TextInput
                  value={values.startAt}
                  onChange={handleChange}
                  name="startAt"
                  aria-label="Początek wynajęcia sali"
                  placeholder="np.: 17:35"
                  label="Początek"
                  time
                />
                <StyledTimeSpan>-</StyledTimeSpan>
                <TextInput
                  value={values.endAt}
                  onChange={handleChange}
                  name="endAt"
                  aria-label="Koniec wynajęcia sali"
                  placeholder="np.: 19:05"
                  label="Koniec"
                  time
                />
              </StyledTimeBox>
            </StyledDateTimeContainer>
            {(isError.is || isCorrect) && (
              <StyledContainer>
                <Message error={isError.is} correct={isCorrect}>
                  {isError.is ? isError.msg : 'Sala zarezerwowana pomyślnie.'}
                </Message>
              </StyledContainer>
            )}
            <StyledButton isLoading={isLoading}>Zarezerwuj</StyledButton>
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
