import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const MenuContext = createContext();
const { Provider } = MenuContext;

const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isFiltersOpen,
        setIsFiltersOpen,
      }}
    >
      {children}
    </Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MenuContext, MenuProvider };
