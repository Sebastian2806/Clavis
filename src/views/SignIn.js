import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import KeyIcon from '../assets/icon/key.svg';
import Title from '../components/atoms/Title';
import TextInput from '../components/molecules/TextInput';
import Button from '../components/atoms/Button';

const StyledWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;

  padding: 10px;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.lightpurple};

  @media (min-width: 450px) {
    width: 400px;
    height: 500px;
    border-radius: 10px;
  }

  & form {
    height: 60%;
  }
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

const SignIn = () => (
  <StyledWrapper>
    <StyledHeader>
      <img src={KeyIcon} alt="" />
      <Title>Clavis</Title>
    </StyledHeader>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <FromWrapper>
            <Wrapper>
              <Field as={TextInput} label="email" name="email" type="email" />
              <Field as={TextInput} label="hasło" name="password" type="password" />
            </Wrapper>
            <Wrapper>{(errors.email || errors.password) && <StyledError>Błędny email lub hasło</StyledError>}</Wrapper>
            <Wrapper>
              <Button>Zaloguj</Button>
            </Wrapper>
          </FromWrapper>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

export default SignIn;
