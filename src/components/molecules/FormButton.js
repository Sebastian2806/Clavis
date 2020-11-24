import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

const StyledButtonContainer = styled.div`
  padding: 15px;
`;

const FormButton = ({ isSubmitting, arialabel }) => (
  <StyledButtonContainer>
    <Button type="submit" disabled={isSubmitting} aria-label={arialabel} isLoading={isSubmitting}>
      dodaj
    </Button>
  </StyledButtonContainer>
);
FormButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  arialabel: PropTypes.string.isRequired,
};

export default FormButton;
