import React from 'react';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import TextInput from '../molecules/TextInput';

const SearchForm = ({ searchBy, setSearchBy }) => {
  const handleSearch = (e) => {
    const v = e.target.value;
    setSearchBy(v);
  };

  return (
    <Formik
      initialValues={{
        search: searchBy,
      }}
    >
      {({ handleChange }) => (
        <Form>
          <Field
            as={TextInput}
            type="search"
            name="search"
            label="Wyszukaj po numerze sali"
            placeholder="np.: aula 02"
            onChange={(e) => {
              handleChange(e);
              handleSearch(e);
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

SearchForm.propTypes = {
  searchBy: PropTypes.string.isRequired,
  setSearchBy: PropTypes.func.isRequired,
};

export default SearchForm;
