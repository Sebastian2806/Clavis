import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../theme/globalStyles';
import theme from '../theme/theme';

const Root = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
  </ThemeProvider>
);

export default Root;
