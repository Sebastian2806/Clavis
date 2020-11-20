import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import KeyIcon from '../assets/icon/key.svg';
import Title from '../components/atoms/Title';
import TextInput from '../components/molecules/TextInput';
import Button from '../components/atoms/Button';
import MainWrapper from '../components/MainWrapper';

const StyledForm = styled(Form)`
  height: 60%;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40%;
`;

const FromWrapper = styled.div`
  height: 100%;
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledError = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.error};
`;

const SignIn = () => {
  const history = useHistory();

  return (
    <MainWrapper>
      <StyledHeader>
        <img src={KeyIcon} alt="" />
        <Title>Clavis</Title>
      </StyledHeader>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          console.log(values);
          setSubmitting(true);
          fetch('https://clavis-rest.herokuapp.com/authorization/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((result) => result.json())
            .then((data) => {
              if (data.errors && data.errors.length > 0) {
                const err = {};
                data.errors.forEach((el) => (err[el.param] = el.msg));
                setErrors(err);
              } else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                history.push('/actions');
              }
              setSubmitting(false);
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ errors, isSubmitting }) => (
          <StyledForm>
            <FromWrapper>
              <Wrapper>
                <Field as={TextInput} label="email" name="email" type="email" />
                <Field as={TextInput} label="hasło" name="password" type="password" />
              </Wrapper>
              <Wrapper>
                {(errors.email || errors.password) && <StyledError>Błędny email lub hasło</StyledError>}
              </Wrapper>
              <Wrapper>
                <Button disabled={isSubmitting}>Zaloguj</Button>
              </Wrapper>
            </FromWrapper>
          </StyledForm>
        )}
      </Formik>
    </MainWrapper>
  );
};
export default SignIn;
