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
import UserList from './UserList';
import MainTemplate from '../components/templates/MainTemplate';
import AuthRoute from '../components/privateRoutes/AuthRoute';
import AdminRoute from '../components/privateRoutes/AdminRoute';
import ApparitorRoute from '../components/privateRoutes/ApparitorRoute';
import AdminAndApparitorRoute from '../components/privateRoutes/AdminAndApparitorRoute';
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
          <AdminAndApparitorRoute path="/rentalregistry">
            <RentalRegistry />
          </AdminAndApparitorRoute>
          <ApparitorRoute path="/issuekey">
            <IssueTheKey />
          </ApparitorRoute>
          <UserRoute path="/yourrentals">
            <YourRentals />
          </UserRoute>
          <AdminRoute path="/userlist">
            <UserList />
          </AdminRoute>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </MainTemplate>
    </Router>
  );
};

export default Root;
