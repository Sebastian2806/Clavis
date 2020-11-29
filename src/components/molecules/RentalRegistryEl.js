import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import QueryBuilderSharpIcon from '@material-ui/icons/QueryBuilderSharp';
import PropTypes from 'prop-types';
import Loader from './Loader';
import GridElContainer from './GridElContainer';
import Button from '../atoms/Button';

const StyledBox = styled.div`
  padding: 5px 10px;
`;

const StyledSection = styled(StyledBox)`
  flex-grow: 1;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
`;

const StyledParagraph = styled.p`
  font-size: 20px;
  margin: 0;
`;

const StyledParagraphName = styled(StyledParagraph)`
  font-weight: bold;
`;

const TimePragraph = styled(StyledParagraph)`
  margin-left: 5px;
`;

const StyledTimeWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
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

  const rentalAction = (type, e) => {
    // const elId = e.target.dataset.id;
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
    <GridElContainer height={210}>
      {rentalActionStatus.is && <Loader adjust />}
      <StyledBox as="header">
        <StyledTitle>{number}</StyledTitle>
      </StyledBox>
      <StyledSection as="section">
        <StyledParagraphName>
          <span>{name}&nbsp;</span>
          <span>{surname}</span>
        </StyledParagraphName>
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
      </StyledSection>
      <StyledBox>
        <StyledButton
          onClick={(e) => rentalAction('approve', e)}
          type="button"
          approve
          data-id={id}
          isLoading={rentalActionStatus.type === 'approve' && rentalActionStatus.is}
        >
          Wydaj
        </StyledButton>
        <StyledButton
          onClick={(e) => rentalAction('cancel', e)}
          type="button"
          cancel
          data-id={id}
          isLoading={rentalActionStatus.type === 'cancel' && rentalActionStatus.is}
        >
          Anuluj
        </StyledButton>
      </StyledBox>
    </GridElContainer>
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
