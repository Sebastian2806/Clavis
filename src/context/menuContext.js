import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const MenuContext = createContext();
const { Provider } = MenuContext;

const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 900) setIsMenuOpen(false);
    if (window.innerWidth >= 1000) setIsFiltersOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
