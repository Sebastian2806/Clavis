import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/molecules/Loader';
import GridTemplate from '../components/templates/GridTemplate';
import Classroom from '../components/molecules/Classroom';
import Filters from '../components/molecules/Filters';
import { classrooms } from '../data';

const StyledWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    min-height: calc(var(--vh) * 100);
  }
`;

const StyledContainer = styled.div`
  padding: 30px 15px;
`;

const ViewTitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
  margin: 10px 0 30px;
`;

const FindClassroom = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <StyledContainer>
          <ViewTitle>Wyszukiwanie sali</ViewTitle>
          <Filters />
          <GridTemplate>
            {classrooms.map((classroom) => (
              <Classroom {...classroom} />
            ))}
          </GridTemplate>
        </StyledContainer>
      )}
    </StyledWrapper>
  );
};

export default FindClassroom;
