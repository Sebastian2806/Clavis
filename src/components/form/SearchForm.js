import React from 'react';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import TextInput from '../molecules/TextInput';

const SearchForm = ({ searchBy, setSearchBy, label, placeholder }) => {
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
            label={label}
            placeholder={placeholder}
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
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

SearchForm.defaultProps = {
  placeholder: '',
};

export default SearchForm;
