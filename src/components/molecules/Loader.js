import React from 'react';
import styled, { css } from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import PropTypes from 'prop-types';

const StyledLoaderWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  @media (min-width: 600px) {
    min-height: calc(var(--vh) * 100);
  }

  ${({ adjust }) =>
    adjust &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      min-height: 100%;

      @media (min-width: 600px) {
        height: 100%;
        min-height: 100%;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0.6;
        background-color: ${({ theme }) => theme.colors.disabled};
      }
    `}
`;

const Loader = ({ adjust }, props) => (
  <StyledLoaderWrapper adjust={adjust}>
    <PulseLoader {...props} />
  </StyledLoaderWrapper>
);

Loader.propTypes = {
  adjust: PropTypes.bool,
};

Loader.defaultProps = {
  adjust: false,
};

export default Loader;
