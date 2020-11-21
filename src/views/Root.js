import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import GlobalStyles from '../theme/globalStyles';
import theme from '../theme/theme';
import SignIn from './SignIn';
import Actions from './Actions';
import AddClassroom from './AddClassroom';
import AddUser from './AddUser';
import { AuthProvider, AuthContext } from '../context/authContext';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthRoute = ({ children, ...props }) => {
  const authContext = useContext(AuthContext);
  return <Route {...props} render={() => (authContext.isAuthenticated() ? { children } : <Redirect to="signin" />)} />;
};

const AdminRoute = ({ children, ...props }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={() =>
        authContext.isAuthenticated() && authContext.authState.user.role === 'admin' ? (
          { children }
        ) : (
          <Redirect to="signin" />
        )
      }
    />
  );
};

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <StyledWrapper>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/signin" component={SignIn} />
              <AuthRoute path="/actions">
                <Actions />
              </AuthRoute>
              <AdminRoute path="/addclassroom">
                <AddClassroom />
              </AdminRoute>
              <AdminRoute path="/adduser">
                <AddUser />
              </AdminRoute>
              {/* <Route path="/findclassroom" /> */}
              {/* <Route path="/classroomdesc/:id" /> */}
              {/* <Route path="/classroomdesc/:id/confirm" /> */}
            </Switch>
          </StyledWrapper>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
