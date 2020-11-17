import React from 'react';
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
  { id: 1, value: 'hall', label: 'Aula' },
  { id: 2, value: 'humane', label: 'Humanistyczna' },
  { id: 3, value: 'ITsuite', label: 'Komputerowa' },
];

const StyledHeader = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddClassroom = () => {
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
              room_number: '',
              type: 'hall',
              capacity: '',
              description: '',
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, values, handleChange }) => (
              <StyledForm>
                <Field as={TextInput} label="numer sali" name="room_number" type="number" />
                <Select data={types} label="typ sali" name="type" value={values.type} onChange={handleChange} />
                <Field as={TextInput} label="pojemność" name="capacity" type="number" />
                <Field as={TextInput} label="opis" name="description" textarea rows="3" />
                {(errors.email || errors.password) && <StyledError>Błędny email lub hasło</StyledError>}
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
