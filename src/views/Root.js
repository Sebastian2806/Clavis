import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import AddClassroom from './AddClassroom';
import FindClassroom from './FindClassroom';
import AddUser from './AddUser';
import RentalRegistry from './RentalRegistry';
import IssueTheKey from './IssueTheKey';
import YourRentals from './YourRentals';
import MainTemplate from '../components/templates/MainTemplate';
import AuthRoute from '../components/privateRoutes/AuthRoute';
import AdminRoute from '../components/privateRoutes/AdminRoute';
import ApparitorRoute from '../components/privateRoutes/ApparitorRoute';
import UserRoute from '../components/privateRoutes/UserRoute';

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
          <AuthRoute path="/findclassroom/:classId?">
            <FindClassroom />
          </AuthRoute>
          <ApparitorRoute path="/rentalregistry">
            <RentalRegistry />
          </ApparitorRoute>
          <ApparitorRoute path="/issuekey">
            <IssueTheKey />
          </ApparitorRoute>
          <UserRoute>
            <YourRentals path="/yourrentals" />
          </UserRoute>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </MainTemplate>
    </Router>
  );
};

export default Root;
