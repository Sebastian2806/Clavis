import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import CardBox from '../atoms/CardBox';
import Button from '../atoms/Button';

const StyledWrapper = styled(CardBox)`
  padding: 15px 10px 5px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
  font-size: 15px;
  height: 38px;
  margin-bottom: 5px;

  ${({ cancel }) =>
    cancel &&
    css`
      margin-left: 10px;
    `}
`;

const CardActions = ({ rentalAction, rentalActionStatus }) => {
  return (
    <StyledWrapper>
      <StyledButton
        onClick={(e) => rentalAction('approve', e)}
        type="button"
        approve
        isLoading={rentalActionStatus.type === 'approve' && rentalActionStatus.is}
      >
        Wydaj
      </StyledButton>
      <StyledButton
        onClick={(e) => rentalAction('cancel', e)}
        type="button"
        cancel
        isLoading={rentalActionStatus.type === 'cancel' && rentalActionStatus.is}
      >
        Anuluj
      </StyledButton>
    </StyledWrapper>
  );
};

CardActions.propTypes = {
  rentalAction: PropTypes.func.isRequired,
  rentalActionStatus: PropTypes.shape({
    type: PropTypes.string.isRequired,
    is: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CardActions;
