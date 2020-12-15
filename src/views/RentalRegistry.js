import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Loader from '../components/molecules/Loader';
import ViewTitle from '../components/atoms/ViewTitle';
import GridTemplate from '../components/templates/GridTemplate';
import RentalCard from '../components/molecules/RentalCard';
import FixedMessage from '../components/atoms/FixedMessage';
import SearchForm from '../components/form/SearchForm';
import { useSearch } from '../hooks/useSearch';
import { RentalContext } from '../context/rentalsContext';
import { FetchContext } from '../context/fetchContext';

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
  const rentalContext = useContext(RentalContext);
  const fetchContext = useContext(FetchContext);
  const [searchBy, setSearchBy, filterByField] = useSearch();
  const [rental, setRental] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageStatus, setMessageStatus] = useState({ show: false, msg: 'Akcja wykonana pomyślnie.' });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const rentals = await fetchContext.authAxios.get('apparitor/reservations');
      rentalContext.setRental(rentals.data.reservations);
      setRental(rentals.data.reservations);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setRental(rentalContext.rentals);
  }, [rentalContext.rentals]);

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
            <SearchForm searchBy={searchBy} setSearchBy={setSearchBy} label="Wyszukaj po nazwisku" />
            <GridTemplate>
              {rental.length > 0 ? (
                rental.map((rentalEl) => (
                  <RentalCard
                    key={rentalEl.classroom.number}
                    id={rentalEl._id}
                    messageStatus={messageStatus}
                    setMessageStatus={setMessageStatus}
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
