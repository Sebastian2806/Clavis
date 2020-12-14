import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import QueryBuilderSharpIcon from '@material-ui/icons/QueryBuilderSharp';
import PropTypes from 'prop-types';
import Loader from './Loader';
import CardWrapper from './CardWrapper';
import CardActions from './CardActions';
import CardBox from '../atoms/CardBox';
import CardHeader from '../atoms/CardHeader';
import { RentalContext } from '../../context/rentalsContext';
import { CANCELED, FINISHED, TAKEN } from '../../util/constants';
import { transformDateToLocal } from '../../util/helpers';

const StyledTime = styled.time`
  font-size: 20px;
  margin: 0;
  margin-left: 5px;
`;

const StyledTimeWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
`;

const setMessage = (status) => {
  switch (status) {
    case CANCELED:
      return 'Rezerwacja anulowana.';
    case TAKEN:
      return 'Klucz wydany.';
    case FINISHED:
      return 'Klucz przyjęty.';
    default:
      return 'Akcja wykonana pomyślnie.';
  }
};

const RentalCard = ({ id, messageStatus, setMessageStatus, userRentals }) => {
  const rentalContext = useContext(RentalContext);
  const [rental, setRental] = useState(() => rentalContext.getRentalById(id));
  const [isLoading, setIsLoading] = useState(false);

  const changeStatus = (status) => {
    setIsLoading(true);
    setTimeout(() => {
      if (!messageStatus.show) {
        setMessageStatus({ msg: setMessage(status), show: true });
      }

      const rentalsCopy = rentalContext.rentals.map((el) => (el.id === id ? { ...el, status } : el));

      rentalContext.setRental(rentalsCopy);

      setTimeout(() => {
        setMessageStatus({ msg: setMessage(status), show: false });
      }, 1000);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setRental(rentalContext.getRentalById(id));
  }, [rentalContext.rentals]);

  return (
    <CardWrapper>
      {isLoading && <Loader adjust />}
      <CardHeader>
        <h2>{rental.number}</h2>
      </CardHeader>
      {!userRentals && (
        <CardBox>
          <p>
            <span>{rental.name}</span> <span>{rental.surname}</span>
          </p>
        </CardBox>
      )}
      <CardBox>
        <div>
          <StyledTimeWrapper>
            <DateRangeSharpIcon />
            <StyledTime datatime={rental.startAt}>{transformDateToLocal(rental.startAt)}</StyledTime>
          </StyledTimeWrapper>
          <StyledTimeWrapper>
            <QueryBuilderSharpIcon />
            <StyledTime datatime={rental.startAt}>{transformDateToLocal(rental.startAt, 'HH:mm')}</StyledTime>
            <span>&nbsp;-</span>
            <StyledTime datatime={rental.endAt}>{transformDateToLocal(rental.endAt, 'HH:mm')}</StyledTime>
          </StyledTimeWrapper>
        </div>
      </CardBox>
      <CardActions userRentals={userRentals} changeStatus={changeStatus} status={rental.status} isLoading={isLoading} />
    </CardWrapper>
  );
};

RentalCard.propTypes = {
  id: PropTypes.number.isRequired,
  setMessageStatus: PropTypes.func.isRequired,
  messageStatus: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
  }).isRequired,
  userRentals: PropTypes.bool,
};

RentalCard.defaultProps = {
  userRentals: false,
};

export default RentalCard;
