import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextInput from '../components/molecules/TextInput';
import Button from '../components/atoms/Button';
import Select from '../components/molecules/Select';
import { FetchContext } from '../context/fetchContext';

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

const roles = [
  { id: 1, value: 'admin', label: 'Admin' },
  { id: 2, value: 'user', label: 'Użytkownik' },
  { id: 3, value: 'apparitor', label: 'Wydający' },
];

const AddUser = () => {
  const fetchContext = useContext(FetchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);
  return (
    <>
      <div>
        <div>
          <div>
            <PersonAddIcon />
          </div>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              role: 'admin',
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setIsLoading(true);
                setSubmitting(false);
                const data = await fetchContext.authAxios.put('admin/adduser', values);
                console.log(data);
                setIsError('');
              } catch (err) {
                if (err.response.data.errors && err.response.data.errors.length > 0) {
                  const error = {};
                  err.response.data.errors.forEach((el) => (error[el.param] = el.msg));
                  console.log(error);
                  setErrors(error);
                } else {
                  setIsError('Wystąpił błąd podczas dodawania użytkownika.');
                }
              }
              setIsLoading(true);
              setSubmitting(false);
            }}
          >
            {({ errors, values, handleChange }) => (
              <StyledForm>
                {JSON.stringify(errors)}
                <Field as={TextInput} label="imie" name="name" type="text" />
                <Field as={TextInput} label="nazwisko" name="surname" type="text" />
                <Select data={roles} label="rola" name="role" value={values.type} onChange={handleChange} />
                <Field as={TextInput} label="email" name="email" type="email" />
                <Field as={TextInput} label="hasło" name="password" type="password" />
                {(errors.email || errors.password) && <StyledError>Błąd podczas dodawanie użytkownika</StyledError>}
                {message && <p>{message}</p>}
                <StyledButton>dodaj</StyledButton>
              </StyledForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddUser;
