import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import AddClassroom from './AddClassroom';
import AddUser from './AddUser';
import MainTemplate from '../components/templates/MainTemplate';
import AuthRoute from '../components/privateRoutes/AuthRoute';
import AdminRoute from '../components/privateRoutes/AdminRoute';

const Root = () => {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <AuthRoute exact path="/">
            <Home />
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
      </MainTemplate>
    </Router>
  );
};

export default Root;
