import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/authContext';
import Wrapper from '../atoms/Wrapper';
import Header from '../molecules/Header';
import Menu from '../Menu';

const AdminRoute = ({ children, ...props }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={() =>
        authContext.isAuthenticated() && authContext.authState.user.role === 'admin' ? (
          <>
            <Menu />
            <Wrapper>
              <Header />
              {children}
            </Wrapper>
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
