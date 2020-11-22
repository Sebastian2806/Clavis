import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const authToken = localStorage.getItem('token');
  const userInfo = localStorage.getItem('user');
  const expiresAt = localStorage.getItem('expiresAt');

  // const { decodedToken } = useJwt(authToken);
  // if (authToken) localStorage.setItem('expiresAt', 1606055311);
  // console.log(authToken);

  const [authState, setAuthState] = useState({
    token: authToken,
    expiresAt,
    user: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiresAt', 1606056600);
    setAuthState({
      token,
      expiresAt: 1606056600,
      user,
    });
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('user');
      //   localStorage.removeItem('expiresAt');
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiresAt');
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
