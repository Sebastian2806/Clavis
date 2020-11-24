import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  border: 3px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius};
  margin: 30px 0;
  padding: 10px;
`;

const Filters = () => {
  return (
    <StyledWrapper>
      <h1>test</h1>
    </StyledWrapper>
  );
};

export default Filters;
