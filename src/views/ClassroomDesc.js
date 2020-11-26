import React from 'react';
import styled from 'styled-components';
import Background from '../components/atoms/Background';

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh) * 100);
  z-index: 20000;
`;

const StyledBackground = styled.div`
  width: 100%;
  height: calc(var(--vh) * 100);
  background-color: #000;
  opacity: 0.6;
  z-index: 19999;
  top: 0;
  left: 0;
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ClassroomDesc = () => {
  return (
    <>
      <StyledWrapper>
        <p>123</p>
      </StyledWrapper>
      {/* <StyledBackground isOpen /> */}
    </>
  );
};

export default ClassroomDesc;
