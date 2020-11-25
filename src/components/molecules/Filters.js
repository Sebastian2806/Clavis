import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import Checkbox from './Checkbox';
import Button from '../atoms/Button';
import FiltersHeader from './FiltersHeader';
import TextInput from './TextInput';
import SubTitle from '../atoms/SubTitle';
import { MenuContext } from '../../context/menuContext';

const StyledWrapper = styled.div`
  width: 250px;
  top: 0;
  right: 0;
  border-left: 3px solid ${({ theme }) => theme.colors.dark};
  padding: 10px;
  min-height: calc(var(--vh) * 100);
  transition: transform 150ms ease-out;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.light};
  transform: ${({ isFiltersOpen }) => (isFiltersOpen ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 10000;

  @media (min-width: 1000px) {
    position: static;
    transform: translateX(0);
  }
`;

const StyledFormContainer = styled.div`
  margin-bottom: 40px;
`;

const StyledBox = styled.div`
  width: 220px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};

  &:last-child {
    border-bottom: 0;
  }
`;

const Filters = () => {
  const { isFiltersOpen } = useContext(MenuContext);

  return (
    <StyledWrapper isFiltersOpen={isFiltersOpen}>
      <FiltersHeader />
      <Formik
        // validationSchema={}
        initialValues={{
          status: [],
          start: '',
          end: '',
        }}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          console.log(values);
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <StyledFormContainer>
              <StyledBox>
                <SubTitle>W godzinach:</SubTitle>
                <Field
                  as={TextInput}
                  name="start"
                  error=""
                  label=""
                  aria-label="Początek wynajęcia sali"
                  placeholder="np.: 17:35"
                />
                <Field
                  as={TextInput}
                  name="end"
                  error=""
                  label=""
                  aria-label="Koniec wynajęcia sali"
                  placeholder="np.: 19:05"
                />
              </StyledBox>
              <StyledBox role="group" aria-labelledby="checkbox-status-group">
                <SubTitle id="checkbox-status-group">Status sali:</SubTitle>
                <ul>
                  <Field as={Checkbox} name="status" label="Wolna" type="checkbox" value="free" />
                  <Field as={Checkbox} name="status" label="Zajęta" type="checkbox" value="take" />
                  <Field as={Checkbox} name="status" label="Zarezerwowana" type="checkbox" value="book" />
                </ul>
              </StyledBox>
            </StyledFormContainer>
            <Button>Filtruj</Button>
          </Form>
        )}
      </Formik>
    </StyledWrapper>
  );
};

export default Filters;
