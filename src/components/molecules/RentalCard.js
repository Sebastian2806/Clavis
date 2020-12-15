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
import { CANCELED, FINISH, TAKE } from '../../util/constants';
import { transformDateToLocal } from '../../util/helpers';
import { FetchContext } from '../../context/fetchContext';

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
    case TAKE:
      return 'Klucz wydany.';
    case FINISH:
      return 'Klucz przyjęty.';
    default:
      return 'Akcja wykonana pomyślnie.';
  }
};

const RentalCard = ({ id, messageStatus, setMessageStatus, userRentals }) => {
  const rentalContext = useContext(RentalContext);
  const fetchContext = useContext(FetchContext);
  const [rental, setRental] = useState(() => rentalContext.getRentalById(id));
  const [isLoading, setIsLoading] = useState(false);

  const changeStatus = async (status) => {
    setIsLoading(true);
    // if (!messageStatus.show) {
    //   setMessageStatus({ msg: setMessage(status), show: true });
    // }
    try {
      if (status === CANCELED) {
        await fetchContext.authAxios.delete(`apparitor/reservation/${id}/cancel`);
        const rentalsCopy = rentalContext.rentals.map((el) => (el._id === id ? { ...el, status } : el));
        rentalContext.setRental(rentalsCopy);
      } else if (status === TAKE) {
        await fetchContext.authAxios.post(`apparitor/reservation/${id}/take`);
        const rentalsCopy = rentalContext.rentals.map((el) => (el._id === id ? { ...el, status } : el));
        rentalContext.setRental(rentalsCopy);
      } else if (status === FINISH) {
        await fetchContext.authAxios.post(`apparitor/reservation/${id}/finish`);
        const rentalsCopy = rentalContext.rentals.map((el) => (el._id === id ? { ...el, status } : el));
        rentalContext.setRental(rentalsCopy);
      }

      setMessageStatus({ msg: setMessage(status), show: true });
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
    setTimeout(() => {
      setMessageStatus({ msg: setMessage(status), show: false });
    }, 1000);
  };

  useEffect(() => {
    setRental(rentalContext.getRentalById(id));
  }, [rentalContext.rentals]);

  return (
    <CardWrapper>
      {isLoading && <Loader adjust />}
      <CardHeader>
        <h2>{rental.classroom.number}</h2>
      </CardHeader>
      {!userRentals && (
        <CardBox>
          <p>
            <span>{rental.creator.name}</span> <span>{rental.creator.surname}</span>
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
  id: PropTypes.string.isRequired,
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
