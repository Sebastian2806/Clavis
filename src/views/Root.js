import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from '../theme/globalStyles';
import theme from '../theme/theme';

const Root = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Router>
      <Switch>
        <Route exact path="/" />
        <Route path="/signin" />
        <Route path="/addclassroom" />
        <Route path="/adduser" />
        <Route path="/findclassroom" />
        <Route path="/classroomdesc/:id" />
        <Route path="/classroomdesc/:id/confirm" />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default Root;
