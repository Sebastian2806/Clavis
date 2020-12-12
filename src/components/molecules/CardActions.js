import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import CardBox from '../atoms/CardBox';
import Button from '../atoms/Button';
import { BOOKED, CANCELED, FINISHED, TAKEN } from '../../util/constants';
import SubTitle from '../atoms/SubTitle';

const StyledWrapper = styled(CardBox)`
  padding: 15px 10px 5px;
`;

const StyledButton = styled(Button)`
  min-width: 80px;
  font-size: 15px;
  height: 38px;
  margin-bottom: 5px;

  ${({ cancel, userRentals }) =>
    cancel &&
    !userRentals &&
    css`
      margin-left: 10px;
    `}
`;

const StyledInfo = styled(SubTitle)`
  font-weight: bold;
`;

const CardActions = ({ userRentals, changeStatus, status, isLoading }) => {
  return (
    <StyledWrapper>
      {!userRentals && status === BOOKED && (
        <StyledButton
          onClick={(e) => changeStatus(TAKEN, e)}
          type="button"
          approve
          isLoading={isLoading && status === BOOKED}
          aria-label="Wydaj klucz nauczycielowi"
        >
          Wydaj
        </StyledButton>
      )}

      {!userRentals && status === TAKEN && (
        <StyledButton
          onClick={(e) => changeStatus(FINISHED, e)}
          type="button"
          taken
          isLoading={isLoading && status === TAKEN}
          aria-label="Odbierz klucz od nauczyciela"
        >
          Zwróć
        </StyledButton>
      )}

      {status !== TAKEN && (
        <StyledButton
          onClick={(e) => changeStatus(CANCELED, e)}
          type="button"
          cancel
          isLoading={isLoading && status === BOOKED}
          userRentals={userRentals}
          aria-label="Anuluj rezerwacje"
          data-status={CANCELED}
        >
          Anuluj
        </StyledButton>
      )}

      {userRentals && status === TAKEN && <StyledInfo>Klucz został pobrany</StyledInfo>}
    </StyledWrapper>
  );
};

CardActions.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  userRentals: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

CardActions.defaultProps = {
  userRentals: false,
};

export default CardActions;
