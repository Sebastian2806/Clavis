import React, { useEffect } from 'react';
import _ from 'lodash';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/theme';
import { AuthProvider } from '../../context/authContext';
import { setVH } from '../../util/helpers';

const setHeight = setVH();

const StyledWrapper = styled.div`
  width: 100%;
  min-height: calc(var(--vh) * 100);
`;

const MainTemplate = ({ children }) => {
  useEffect(() => {
    setHeight();
    const debouced = _.debounce(setHeight, 500);
    window.addEventListener('resize', debouced);

    return () => {
      window.removeEventListener('resize', debouced);
    };
  }, []);

  return (
    <StyledWrapper>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </StyledWrapper>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
