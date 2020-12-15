import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import TextInput from '../molecules/TextInput';
import Button from '../atoms/Button';
import Message from '../atoms/Message';
import { AuthContext } from '../../context/authContext';
import { FetchContext } from '../../context/fetchContext';

const StyledBErrorContainer = styled.div`
  padding: 10px 0 0;
`;

const StyledButtonContainer = styled.div`
  padding: 30px 0 0;
`;

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Pole wymagane'),
  password: Yup.string().required('Pole wymagane'),
});

const UserSignInForm = ({ setRedirectOnLogin }) => {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Wystąpił błąd podczas logowania.');

  return (
    <Formik
      validationSchema={SignInSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          setIsCorrect(false);
          setSubmitting(true);
          setIsLoading(true);
          const res = await fetchContext.authAxios.post('authorization/login', values);
          setIsError(false);
          const isErr = authContext.setAuthInfo(res.data);
          if (isErr instanceof Error) {
            setIsLoading(false);
            throw isErr;
          }
          setIsCorrect(true);
          setTimeout(() => setRedirectOnLogin(true), 500);
        } catch (err) {
          setIsError(true);
          if (
            (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) ||
            (err.response && err.response.data && err.response.data.error && err.response.data.error.message)
          )
            setErrorMsg('Niepoprawny email lub hasło.');
          else setErrorMsg('Wystąpił błąd podczas logowania.');

          setIsLoading(false);
        }
        setSubmitting(true);
      }}
    >
      {({ errors, touched }) => (
        <Form>
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
            showPassIcon
            error={errors.password && touched.password ? errors.password : ''}
          />
          {(isError || isCorrect) && (
            <StyledBErrorContainer>
              <Message error={isError} correct={isCorrect}>
                {isError ? errorMsg : 'Zalogowano pomyślnie.'}
              </Message>
            </StyledBErrorContainer>
          )}
          <StyledButtonContainer>
            <Button isLoading={isLoading} aria-label="Zaloguj się do serwisu clavis">
              Zaloguj
            </Button>
          </StyledButtonContainer>
        </Form>
      )}
    </Formik>
  );
};

UserSignInForm.propTypes = {
  setRedirectOnLogin: PropTypes.func.isRequired,
};

export default UserSignInForm;
