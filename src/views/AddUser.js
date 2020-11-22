import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '../components/atoms/Button';
import AvatarBox from '../components/atoms/AvatarBox';
import TextInput from '../components/molecules/TextInput';
import Select from '../components/molecules/Select';
import { FetchContext } from '../context/fetchContext';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 600px) {
    align-items: center;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 300px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1000px) {
    max-width: 600px;
  }
`;

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

const StyledMessageContainer = styled.div`
  padding: 0 15px;
`;

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.light};
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  background-color: ${({ theme }) => theme.colors.error};

  ${({ correct }) =>
    correct &&
    css`
      background-color: ${({ theme }) => theme.colors.approve};
    `}
`;

const roles = [
  { id: 1, value: 'admin', label: 'Admin' },
  { id: 2, value: 'user', label: 'Użytkownik' },
  { id: 3, value: 'apparitor', label: 'Wydający' },
];

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

const AddUser = () => {
  const fetchContext = useContext(FetchContext);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  return (
    <>
      <StyledWrapper>
        <StyledContainer>
          <AvatarBox>
            <PersonAddIcon />
          </AvatarBox>
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
                if (
                  err.response &&
                  err.response.data &&
                  err.response.data.errors &&
                  err.response.data.errors.length > 0
                ) {
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
                {isError && (
                  <StyledMessageContainer>
                    <StyledMessage>Wystąpił błąd podczas dodawania użytkownika.</StyledMessage>
                  </StyledMessageContainer>
                )}
                {isCorrect && (
                  <StyledMessageContainer>
                    <StyledMessage correct>Pomyślnie dodano użytkownika do bazy.</StyledMessage>
                  </StyledMessageContainer>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Dodaj nowego użytkownika"
                  isLoading={isSubmitting}
                >
                  dodaj
                </Button>
              </StyledForm>
            )}
          </Formik>
        </StyledContainer>
      </StyledWrapper>
    </>
  );
};

export default AddUser;
