import React from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';

const StyledLoaderWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    min-height: calc(var(--vh) * 100);
  }
`;

const Loader = (props) => (
  <StyledLoaderWrapper>
    <PulseLoader {...props} />
  </StyledLoaderWrapper>
);

export default Loader;
