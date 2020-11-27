import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import AddClassroom from './AddClassroom';
import FindClassroom from './FindClassroom';
import AddUser from './AddUser';
import MainTemplate from '../components/templates/MainTemplate';
import AuthRoute from '../components/privateRoutes/AuthRoute';
import AdminRoute from '../components/privateRoutes/AdminRoute';
import ApparitorRoute from '../components/privateRoutes/ApparitorRoute';

const Root = () => {
  return (
    <Router basename="/Clavis">
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
          <AuthRoute exact path="/findclassroom/:classId?">
            <FindClassroom />
          </AuthRoute>
          <ApparitorRoute exact path="/rentalregistry">
            <FindClassroom />
          </ApparitorRoute>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </MainTemplate>
    </Router>
  );
};

export default Root;
