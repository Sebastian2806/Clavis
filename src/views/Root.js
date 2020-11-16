import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from '../theme/globalStyles';
import theme from '../theme/theme';
import SignIn from './SignIn';
import Actions from './Actions';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Root = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <StyledWrapper>
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route path="/signin" component={SignIn} />
          <Route path="/actions" component={Actions} />
          <Route path="/addclassroom" />
          <Route path="/adduser" />
          <Route path="/findclassroom" />
          <Route path="/classroomdesc/:id" />
          <Route path="/classroomdesc/:id/confirm" />
        </Switch>
      </Router>
    </StyledWrapper>
  </ThemeProvider>
);

export default Root;
