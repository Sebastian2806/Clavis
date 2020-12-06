import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import TuneIcon from '@material-ui/icons/Tune';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/molecules/Loader';
import GridTemplate from '../components/templates/GridTemplate';
import Classroom from '../components/molecules/Classroom';
import Filters from '../components/molecules/Filters';
import IconBox from '../components/atoms/IconBox';
import ViewTitle from '../components/atoms/ViewTitle';
import { MenuContext } from '../context/menuContext';
import ClassroomDesc from '../components/molecules/ClassroomDesc';
import { FetchContext } from '../context/fetchContext';
import { ClassroomContext } from '../context/classroomsContext';

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
  const fetchContext = useContext(FetchContext);
  const classroomContext = useContext(ClassroomContext);
  const { setIsFiltersOpen } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesc, setIsDesc] = useState(false);
  const { classId } = useParams();
  const [classrooms, setClassrooms] = useState(null);

  const labels = [
    {
      status: 'free',
      label: 'wolna',
    },
    {
      status: 'book',
      label: 'zarezerwowana',
    },
    {
      status: 'take',
      label: 'zajęta',
    },
  ];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const cl = await fetchContext.authAxios.post('classrooms', {});

      const classroomsInfo = cl.data.classrooms.map((classroom) => {
        const [name] = labels.filter((el) => el.status === classroom.status);
        return { ...classroom, label: name.label };
      });

      classroomContext.setClassrooms(classroomsInfo);
      setClassrooms(classroomsInfo);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
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
                  <StyledIconBox mode="dark" onClick={() => setIsFiltersOpen(true)}>
                    <TuneIcon />
                  </StyledIconBox>
                </StyledTitleContainer>
                <GridTemplate areFiltersApplied>
                  {classrooms.map((classroom) => (
                    <Link to={`/findclassroom/${classroom.id}`} key={classroom.number}>
                      <Classroom {...classroom} />
                    </Link>
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
