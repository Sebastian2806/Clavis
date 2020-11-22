import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/authContext';

const AuthRoute = ({ children, ...props }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route {...props} render={() => (authContext.isAuthenticated() ? <>{children}</> : <Redirect to="signin" />)} />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
