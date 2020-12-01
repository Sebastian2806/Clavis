import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../components/molecules/Loader';
import ViewTitle from '../components/atoms/ViewTitle';
import GridTemplate from '../components/templates/GridTemplate';
import RentalRegistryEl from '../components/molecules/RentalRegistryEl';
import { rental } from '../data';
import FixedMessage from '../components/atoms/FixedMessage';

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

const RentalRegistry = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messageStatus, setMessageStatus] = useState({ show: false, msg: 'Akcja wykonana pomyślnie.' });

  const removeEL = (id) => {
    const rentalCopy = rental.filter((el) => el.id !== id);
    rental.length = 0;
    rental.push(...rentalCopy);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <StyledContainer>
          <div>
            <StyledHeader>
              <ViewTitle>Rejestr wypożyczeń</ViewTitle>
            </StyledHeader>
            <GridTemplate>
              {rental.length > 0 ? (
                rental.map((rentalEl) => (
                  <RentalRegistryEl
                    key={rentalEl.number}
                    messageStatus={messageStatus}
                    setMessageStatus={setMessageStatus}
                    removeEL={removeEL}
                    {...rentalEl}
                  />
                ))
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

export default RentalRegistry;
