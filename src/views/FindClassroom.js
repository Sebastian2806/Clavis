import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import TuneIcon from '@material-ui/icons/Tune';
import { useParams } from 'react-router-dom';
import Loader from '../components/molecules/Loader';
import GridTemplate from '../components/templates/GridTemplate';
import Classroom from '../components/molecules/Classroom';
import Filters from '../components/molecules/Filters';
import { classrooms } from '../data';
import IconBox from '../components/atoms/IconBox';
import { MenuContext } from '../context/menuContext';
import ClassroomDesc from '../components/molecules/ClassroomDesc';

const StyledWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    min-height: calc(var(--vh) * 100);
  }
`;

const StyledContainer = styled.div`
  padding: 30px 15px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ViewTitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
  margin: 10px 0 30px;
`;

const StyledBox = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const StyledIconBox = styled(IconBox)`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const FindClassroom = () => {
  const { setIsFiltersOpen } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesc, setIsDesc] = useState(false);
  const { classId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (classId) setIsDesc(true);
    else setIsDesc(false);
  }, [classId]);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <>
          <StyledBox>
            <StyledContainer>
              <div>
                <StyledTitleContainer>
                  <ViewTitle>Wyszukiwanie sali</ViewTitle>
                  <StyledIconBox mode="light" onClick={() => setIsFiltersOpen(true)}>
                    <TuneIcon />
                  </StyledIconBox>
                </StyledTitleContainer>
                <GridTemplate>
                  {classrooms.map((classroom) => (
                    <Classroom key={classroom.number} {...classroom} />
                  ))}
                </GridTemplate>
              </div>
            </StyledContainer>
            <Filters />
          </StyledBox>
          {isDesc && <ClassroomDesc />}
        </>
      )}
    </StyledWrapper>
  );
};

export default FindClassroom;
