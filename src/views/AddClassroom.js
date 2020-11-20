import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import TextInput from '../components/molecules/TextInput';
import Button from '../components/atoms/Button';
import Header from '../components/molecules/Header';
import Select from '../components/molecules/Select';
import AddClassroomIcon from '../assets/icon/addclassroom.svg';

const StyledWrapper = styled.div`
  min-width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 30px;

  @media (min-width: 600px) {
    padding-top: 50px;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled(Form)`
  width: 80%;
`;

const StyledError = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.error};
`;

const StyledButton = styled(Button)`
  margin-top: 50px;
`;

const types = [
  { id: 1, value: 'Aula', label: 'Aula' },
  { id: 2, value: 'Humanistyczna', label: 'Humanistyczna' },
  { id: 3, value: 'Komputerowa', label: 'Komputerowa' },
];

const StyledHeader = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddClassroom = () => {
  const [message, setMessage] = useState(null);

  return (
    <>
      <Header />
      <StyledWrapper>
        <StyledContainer>
          <StyledHeader>
            <img src={AddClassroomIcon} alt="" />
          </StyledHeader>
          <Formik
            initialValues={{
              number: '',
              type: 'Aula',
              capacity: '',
              description: '',
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);
              fetch('https://clavis-rest.herokuapp.com/admin/addclassroom', {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              })
                .then((result) => result.json())
                .then((data) => {
                  console.log(data);
                  if (data.errors && data.errors.length > 0) {
                    const err = {};
                    data.errors.forEach((el) => (err[el.param] = el.msg));
                    setErrors(err);
                  } else {
                    setMessage('Klasa dodany pomyślnie!');
                  }
                  setSubmitting(false);
                })
                .catch((err) => console.log(err));
            }}
          >
            {({ errors, values, handleChange }) => (
              <StyledForm>
                <Field as={TextInput} label="numer sali" name="number" type="number" />
                <Select data={types} label="typ sali" name="type" value={values.type} onChange={handleChange} />
                <Field as={TextInput} label="pojemność" name="capacity" type="number" />
                <Field as={TextInput} label="opis" name="description" textarea rows="3" />
                {(errors.email || errors.password) && <StyledError>Błąd podczas dodawania klasy</StyledError>}
                {message && <p>{message}</p>}
                <StyledButton>dodaj</StyledButton>
              </StyledForm>
            )}
          </Formik>
        </StyledContainer>
      </StyledWrapper>
    </>
  );
};

export default AddClassroom;
