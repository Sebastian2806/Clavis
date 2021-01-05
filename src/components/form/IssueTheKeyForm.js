import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import TextInput from '../molecules/TextInput';
import Select from '../molecules/Select';
import FormButton from '../molecules/FormButton';
import { FetchContext } from '../../context/fetchContext';
import Message from '../atoms/Message';

const StyledSideContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledContainer = styled.div`
  padding: 15px;
`;

const IssueTheKeySchema = Yup.object().shape({
  classroomId: Yup.string().required('Pole wymagane'),
  userId: Yup.string().required('Pole wymagane'),
  duration: Yup.number().required('Pole wymagane').typeError('Wymagana jest liczba'),
});

const IssueTheKeyForm = ({ users, classrooms }) => {
  const fetchContext = useContext(FetchContext);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [data, setData] = useState({ users: [], classrooms: [] });

  useEffect(() => {
    const newUsers = users.map((el) => ({
      id: el.id,
      value: el.id,
      label: `${el.name} ${el.surname}`,
    }));

    const newClassrooms = classrooms.map((el) => ({
      id: el.id,
      value: el.id,
      label: el.number,
    }));

    setData({
      users: newUsers,
      classrooms: newClassrooms,
    });
  }, [users, classrooms]);

  return (
    <Formik
      validationSchema={IssueTheKeySchema}
      initialValues={{
        userId: users[0].id,
        classroomId: classrooms[0].id,
        duration: 90,
      }}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        console.log(values);
        try {
          setIsCorrect(false);
          setSubmitting(true);
          await fetchContext.authAxios.post('apparitor/reservation/fast', values);
          setIsError(false);
          setIsCorrect(true);
          resetForm();
        } catch (err) {
          setIsError(false);
          console.log(err.response);
          if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
            const error = {};
            err.response.data.errors.forEach((el) => (error[el.param] = el.msg));
            setErrors(error);
          } else {
            setIsError(true);
          }
        }
        setSubmitting(false);
      }}
    >
      {({ errors, touched, values, handleChange, isSubmitting }) => (
        <StyledForm noValidate>
          <StyledSideContainer>
            <Select
              data={data.classrooms}
              label="Numer sali"
              name="classroomId"
              value={values.classroomId}
              onChange={handleChange}
            />
            <Select
              data={data.users}
              label="Imię i nazwisko"
              name="userId"
              value={values.userId}
              onChange={handleChange}
            />
            <Field
              as={TextInput}
              label="Czas trwania w minutach"
              name="duration"
              type="number"
              min="10"
              step="10"
              error={errors.duration && touched.duration ? errors.duration : ''}
            />
          </StyledSideContainer>
          {(isError || isCorrect) && (
            <StyledContainer>
              <Message error={isError} correct={isCorrect}>
                {isError ? 'Wystąpił błąd podczas wydawania klucza.' : 'Klucz wydany pomyślnie.'}
              </Message>
            </StyledContainer>
          )}
          <FormButton isSubmitting={isSubmitting} arialabel="Wydaj klucz do sali" label="wydaj" />
        </StyledForm>
      )}
    </Formik>
  );
};

IssueTheKeyForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }),
  ).isRequired,
  classrooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default IssueTheKeyForm;
