import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/molecules/Loader';
import GridTemplate from '../components/templates/GridTemplate';
import ViewTitle from '../components/atoms/ViewTitle';
import RentalCard from '../components/molecules/RentalCard';
import FixedMessage from '../components/atoms/FixedMessage';
import { CANCELED, FINISH } from '../util/constants';
import { RentalContext } from '../context/rentalsContext';

const StyledWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.hidemenu}) {
    min-height: calc(var(--vh) * 100);
  }
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledContainer = styled.div`
  padding: 30px 15px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const YourRentals = () => {
  const rentalContext = useContext(RentalContext);
  const [rental, setRental] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageStatus, setMessageStatus] = useState({ show: false, msg: 'Akcja wykonana pomyślnie.' });

  useEffect(() => {
    // rentalContext.setRental(rental);
    setRental(rentalContext.rentals);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setRental(rentalContext.rentals);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [rentalContext.rentals]);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <StyledContainer>
          <div>
            <StyledHeader>
              <ViewTitle>Twoje wypożyczenia</ViewTitle>
            </StyledHeader>
            <GridTemplate>
              {rental.length > 0 ? (
                rental.map(
                  (rentalEl) =>
                    rentalEl.status !== CANCELED &&
                    rentalEl.status !== FINISH && (
                      <RentalCard
                        key={rentalEl.number}
                        messageStatus={messageStatus}
                        setMessageStatus={setMessageStatus}
                        userRentals
                        {...rentalEl}
                      />
                    ),
                )
              ) : (
                <p>Brak próśb o wypożyczenie.</p>
              )}
            </GridTemplate>
          </div>
          <FixedMessage show={messageStatus.show}>{messageStatus.msg}</FixedMessage>
        </StyledContainer>
      )}
    </StyledWrapper>
  );
};

export default YourRentals;
