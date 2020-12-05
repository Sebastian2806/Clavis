import React, { useState } from 'react';
import styled from 'styled-components';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import QueryBuilderSharpIcon from '@material-ui/icons/QueryBuilderSharp';
import PropTypes from 'prop-types';
import Loader from './Loader';
import CardWrapper from './CardWrapper';
import CardActions from './CardActions';
import CardBox from '../atoms/CardBox';
import CardHeader from '../atoms/CardHeader';

const StyledParagraph = styled.p`
  font-size: 20px;
  margin: 0;
`;

const TimePragraph = styled(StyledParagraph)`
  margin-left: 5px;
`;

const StyledTimeWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
`;

const RentalRegistryEl = ({
  id,
  number,
  name,
  date,
  surname,
  start,
  end,
  messageStatus,
  setMessageStatus,
  removeEL,
}) => {
  const [rentalActionStatus, setRentalActionStatus] = useState({
    type: '',
    is: false,
  });

  const rentalAction = (type) => {
    setRentalActionStatus({ type, is: true });
    removeEL(id);
    setTimeout(() => {
      setRentalActionStatus({ type: '', is: false });
      setMessageStatus({ ...messageStatus, show: true });

      setTimeout(() => {
        setMessageStatus({ ...messageStatus, show: false });
      }, 1500);
    }, 1000);
  };

  return (
    <CardWrapper>
      {rentalActionStatus.is && <Loader adjust />}
      <CardHeader>
        <h2>{number}</h2>
      </CardHeader>
      <CardBox>
        <p>
          <span>{name}</span> <span>{surname}</span>
        </p>
      </CardBox>
      <CardBox>
        <div>
          <StyledTimeWrapper>
            <DateRangeSharpIcon />
            <TimePragraph>{date}</TimePragraph>
          </StyledTimeWrapper>
          <StyledTimeWrapper>
            <QueryBuilderSharpIcon />
            <TimePragraph>
              {start} - {end}
            </TimePragraph>
          </StyledTimeWrapper>
        </div>
      </CardBox>
      <CardActions rentalAction={rentalAction} rentalActionStatus={rentalActionStatus} />
    </CardWrapper>
  );
};

RentalRegistryEl.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  setMessageStatus: PropTypes.func.isRequired,
  removeEL: PropTypes.func.isRequired,
  messageStatus: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
  }).isRequired,
};

export default RentalRegistryEl;
