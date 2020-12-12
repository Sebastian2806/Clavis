import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { rental } from '../data';

const RentalContext = createContext();
const { Provider } = RentalContext;

const RentalProvider = ({ children }) => {
  const [rentals, setRental] = useState(rental);

  const getRentalIndexById = (id) => rentals.findIndex((el) => el.id === id);

  const getRentalById = (id) => rentals.find((el) => el.id === id);

  const removeRental = (id) => {
    const index = getRentalIndexById(id);
    rentals.splice(index, 1);
  };

  return (
    <Provider
      value={{
        rentals,
        setRental,
        getRentalById,
        getRentalIndexById,
        removeRental,
      }}
    >
      {children}
    </Provider>
  );
};

RentalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RentalContext, RentalProvider };
