import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const authToken = localStorage.getItem('token');
  const userInfo = localStorage.getItem('user');
  const expiresAtTime = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token: authToken,
    expiresAt: expiresAtTime,
    user: userInfo ? JSON.parse(userInfo) : {},
  });

  const removeItemsFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiresAt');
  };

  const setAuthInfo = ({ token, user, expiresAt }) => {
    if (!token || !user) {
      setAuthState({
        token: null,
        expiresAt: null,
        user: {},
      });
      removeItemsFromLocalStorage();
      return Error('Błąd podczas logowania');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiresAt', expiresAt);

    setAuthState({
      token,
      expiresAt,
      user,
    });
    return true;
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt || moment().unix() > authState.expiresAt) {
      removeItemsFromLocalStorage();
      return false;
    }
    return true;
  };

  const logOut = () => {
    removeItemsFromLocalStorage();
    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {},
    });
    history.push('/signin');
  };

  const isAdmin = () => {
    return authState.user.role === 'admin';
  };

  const isApparitor = () => {
    return authState.user.role === 'apparitor';
  };

  return (
    <Provider
      value={{
        authState,
        setAuthInfo,
        isAuthenticated,
        logOut,
        isAdmin,
        isApparitor,
      }}
    >
      {children}
    </Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
