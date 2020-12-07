import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
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
  z-index: 10000;
  background-color: ${({ theme }) => theme.colors.light};
  transform: ${({ isFiltersOpen }) => (isFiltersOpen ? 'translateX(0)' : 'translateX(100%)')};

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

const StyledInput = styled.input`
  width: 65px;
  height: 45px;
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.colors.dark};
  font-size: 19px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radius};

  &:hover,
  &:focus {
    background-color: #f2f4f5;
  }
`;

const StyledTimeBox = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const StyledTimeSpan = styled.span`
  font-size: 45px;
  padding: 0 12px;
`;

const Filters = () => {
  const { isFiltersOpen } = useContext(MenuContext);
  const [start] = useState(moment().format('HH:mm'));
  const [end] = useState(moment().add(90, 'm').format('HH:mm'));

  return (
    <StyledWrapper isFiltersOpen={isFiltersOpen}>
      <FiltersHeader />
      <Formik
        initialValues={{
          status: [],
          start,
          end,
        }}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <StyledFormContainer>
              <StyledBox>
                <SubTitle>W godzinach:</SubTitle>
                <StyledTimeBox>
                  <TextInput
                    value={values.start}
                    onChange={handleChange}
                    input={<StyledInput type="text" />}
                    name="startAt"
                    aria-label="Początek wynajęcia sali"
                    placeholder="np.: 17:35"
                    label="Początek"
                    time
                  />
                  <StyledTimeSpan>-</StyledTimeSpan>
                  <TextInput
                    value={values.endAt}
                    onChange={handleChange}
                    input={<StyledInput type="text" />}
                    name="startAt"
                    aria-label="Koniec wynajęcia sali"
                    placeholder="np.: 19:05"
                    label="Koniec"
                    time
                  />
                </StyledTimeBox>
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
            <Button isLoading={isSubmitting}>Filtruj</Button>
          </Form>
        )}
      </Formik>
    </StyledWrapper>
  );
};

export default Filters;
