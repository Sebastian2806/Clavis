import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import CardBox from '../atoms/CardBox';
import Button from '../atoms/Button';
import { BOOKED, CANCEL, FINISH, TAKE } from '../../util/constants';
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
          onClick={(e) => changeStatus(TAKE, e)}
          type="button"
          approve
          isLoading={isLoading && status === BOOKED}
          aria-label="Wydaj klucz nauczycielowi"
        >
          Wydaj
        </StyledButton>
      )}

      {!userRentals && status === TAKE && (
        <StyledButton
          onClick={(e) => changeStatus(FINISH, e)}
          type="button"
          take
          isLoading={isLoading && status === TAKE}
          aria-label="Odbierz klucz od nauczyciela"
        >
          Zwróć
        </StyledButton>
      )}

      {status !== TAKE && (
        <StyledButton
          onClick={(e) => changeStatus(CANCEL, e)}
          type="button"
          cancel
          isLoading={isLoading && status === BOOKED}
          userRentals={userRentals}
          aria-label="Anuluj rezerwacje"
          data-status={CANCEL}
        >
          Anuluj
        </StyledButton>
      )}

      {userRentals && status === TAKE && <StyledInfo>Klucz został pobrany</StyledInfo>}
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
