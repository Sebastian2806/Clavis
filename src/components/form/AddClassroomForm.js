import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../molecules/TextInput';
import FormButton from '../molecules/FormButton';
import { FetchContext } from '../../context/fetchContext';
import Message from '../atoms/Message';

const StyledSideContainer = styled.div`
  width: 100%;

  @media (min-width: 1000px) {
    display: flex;
  }
`;

const StyledSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  @media (min-width: 1000px) {
    width: 50%;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledContainer = styled.div`
  padding: 15px;
`;

const AddClassroomSchema = Yup.object().shape({
  number: Yup.string()
    .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ0-9]+$/i, 'Dozwolone są tylko cyfry i litery')
    .required('Pole wymagane'),
  capacity: Yup.number()
    .positive('Tylko liczby dodatnie')
    .required('Pole wymagane')
    .typeError('Dozwolone są tylko liczby'),
  description: Yup.string().required('Pole wymagane'),
  type: Yup.string().required('Pole wymagane'),
});

const SignInForm = () => {
  const fetchContext = useContext(FetchContext);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  return (
    <Formik
      validationSchema={AddClassroomSchema}
      initialValues={{
        number: '',
        capacity: '',
        description: '',
        type: '',
      }}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          setIsCorrect(false);
          setSubmitting(true);
          await fetchContext.authAxios.put('admin/addclassroom', values);
          setIsError(false);
          setIsCorrect(true);
          resetForm();
        } catch (err) {
          setIsError(false);
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
      {({ errors, touched, isSubmitting }) => (
        <StyledForm>
          <StyledSideContainer>
            <StyledSide>
              <Field
                as={TextInput}
                label="Numer sali"
                name="number"
                type="text"
                error={errors.number && touched.number ? errors.number : ''}
              />
              <Field
                as={TextInput}
                label="Typ sali"
                name="type"
                type="text"
                error={errors.type && touched.type ? errors.type : ''}
              />
              <Field
                as={TextInput}
                label="Pojemność"
                name="capacity"
                type="text"
                error={errors.capacity && touched.capacity ? errors.capacity : ''}
              />
            </StyledSide>
            <StyledSide>
              <Field
                as={TextInput}
                label="Opis"
                name="description"
                textarea
                rows="10"
                error={errors.description && touched.description ? errors.description : ''}
              />
            </StyledSide>
          </StyledSideContainer>
          {(isError || isCorrect) && (
            <StyledContainer>
              <Message error={isError} correct={isCorrect}>
                {isError ? 'Wystąpił błąd podczas dodawania sali.' : 'Sala dodana pomyślnie.'}
              </Message>
            </StyledContainer>
          )}
          <FormButton isSubmitting={isSubmitting} arialabel="Dodaj nową salę do bazy danych" />
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignInForm;
