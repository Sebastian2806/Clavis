import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../molecules/TextInput';
import Select from '../molecules/Select';
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

const AddUserSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ]+$/i, 'Dozwolone są tylko litery')
    .required('Pole wymagane'),
  surname: Yup.string()
    .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ]+$/i, 'Dozwolone są tylko litery')
    .required('Pole wymagane'),
  email: Yup.string().email('Email jest niepoprawny!').required('Pole wymagane'),
  password: Yup.string().min(8, 'Conajmniej 8 znaków').required('Pole wymagane'),
});

const roles = [
  { id: 1, value: 'admin', label: 'Admin' },
  { id: 2, value: 'user', label: 'Użytkownik' },
  { id: 3, value: 'apparitor', label: 'Wydający' },
];

const SignInForm = () => {
  const fetchContext = useContext(FetchContext);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  return (
    <Formik
      validationSchema={AddUserSchema}
      initialValues={{
        name: '',
        surname: '',
        role: 'admin',
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        try {
          setIsCorrect(false);
          setSubmitting(true);
          await fetchContext.authAxios.put('admin/adduser', values);
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
      {({ errors, touched, values, handleChange, isSubmitting }) => (
        <StyledForm>
          <StyledSideContainer>
            <StyledSide>
              <Field
                as={TextInput}
                label="Imię"
                name="name"
                type="text"
                error={errors.name && touched.name ? errors.name : ''}
              />
              <Field
                as={TextInput}
                label="Nazwisko"
                name="surname"
                type="text"
                error={errors.surname && touched.surname ? errors.surname : ''}
              />
              <Select data={roles} label="Rola" name="role" value={values.type} onChange={handleChange} />
            </StyledSide>
            <StyledSide>
              <Field
                as={TextInput}
                label="Email"
                name="email"
                type="email"
                error={errors.email && touched.email ? errors.email : ''}
              />
              <Field
                as={TextInput}
                label="Hasło"
                name="password"
                type="password"
                error={errors.password && touched.password ? errors.password : ''}
              />
            </StyledSide>
          </StyledSideContainer>
          {(isError || isCorrect) && (
            <StyledContainer>
              <Message error={isError} correct={isCorrect}>
                {isError ? 'Wystąpił błąd podczas dodawania użytkownika.' : 'Użytkownik dodany pomyślnie.'}
              </Message>
            </StyledContainer>
          )}
          <FormButton isSubmitting={isSubmitting} arialabel="Dodaj nowego użytkownika" />
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignInForm;
