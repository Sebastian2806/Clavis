import React, { useEffect } from 'react';
import _ from 'lodash';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import GlobalStyles from '../../theme/globalStyles';
import theme from '../../theme/theme';
import { AuthProvider } from '../../context/authContext';
import { MenuProvider } from '../../context/menuContext';
import { FetchProvider } from '../../context/fetchContext';
import { RentalProvider } from '../../context/rentalsContext';
import { ClassroomProvider } from '../../context/classroomsContext';
import { setVH } from '../../util/helpers';
import Background from '../atoms/Background';

const setHeight = setVH();

const StyledWrapper = styled.div`
  width: 100%;
  min-height: calc(var(--vh) * 100);
  position: relative;
  display: flex;
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
        <FetchProvider>
          <RentalProvider>
            <ClassroomProvider>
              <MenuProvider>
                <ThemeProvider theme={theme}>
                  <GlobalStyles />
                  <Background />
                  {children}
                </ThemeProvider>
              </MenuProvider>
            </ClassroomProvider>
          </RentalProvider>
        </FetchProvider>
      </AuthProvider>
    </StyledWrapper>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
