import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import TuneIcon from '@material-ui/icons/Tune';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/molecules/Loader';
import GridTemplate from '../components/templates/GridTemplate';
import Classroom from '../components/molecules/Classroom';
import Filters from '../components/molecules/Filters';
import ClassroomDesc from '../components/molecules/ClassroomDesc';
import IconBox from '../components/atoms/IconBox';
import ViewTitle from '../components/atoms/ViewTitle';
import SubTitle from '../components/atoms/SubTitle';
import CenteredBox from '../components/atoms/CenteredBox';
import { MenuContext } from '../context/menuContext';
import { FetchContext } from '../context/fetchContext';
import { ClassroomContext } from '../context/classroomsContext';
import { getStatusLabel } from '../util/helpers';

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
  flex-grow: 1;
  display: flex;
  position: relative;
`;

const StyledIconBox = styled(IconBox)`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const StyledIcon = styled(HighlightOffIcon)`
  color: red;
  width: 70px !important;
  height: 70px !important;
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledError = styled(SubTitle)`
  font-size: 30px;
  margin: 20px;
  text-align: center;
`;

const FindClassroom = () => {
  const fetchContext = useContext(FetchContext);
  const classroomContext = useContext(ClassroomContext);
  const { setIsFiltersOpen } = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesc, setIsDesc] = useState(false);
  const [classrooms, setClassrooms] = useState(null);
  const { classId } = useParams();

  const setLabel = (cl) =>
    cl.map((classroom) => {
      const [name] = getStatusLabel(classroom.status);
      return { ...classroom, label: name.label };
    });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const cl = await fetchContext.authAxios.post('classrooms', {});

      const classroomsInfo = setLabel(cl.data.classrooms);

      classroomContext.setClassrooms(classroomsInfo);
      setClassrooms(classroomsInfo);
      setIsLoading(false);
    })();

    return () => {
      setIsFiltersOpen(false);
    };
  }, []);

  useEffect(() => {
    const classroomsInfo = setLabel(classroomContext.classrooms);
    setClassrooms(classroomsInfo);
  }, [classroomContext.classrooms]);

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
              <StyledContent>
                <StyledTitleContainer>
                  <ViewTitle>Wyszukiwanie sali</ViewTitle>
                  <StyledIconBox mode="dark" onClick={() => setIsFiltersOpen(true)}>
                    <TuneIcon />
                  </StyledIconBox>
                </StyledTitleContainer>
                {!(classrooms.length > 0) ? (
                  <GridTemplate areFiltersApplied>
                    {classrooms.map((classroom) => (
                      <Link to={`/findclassroom/${classroom.id}`} key={classroom.number}>
                        <Classroom {...classroom} />
                      </Link>
                    ))}
                  </GridTemplate>
                ) : (
                  <CenteredBox>
                    <StyledIcon />
                    <StyledError>Brak klas spełniających podane kryteria</StyledError>
                  </CenteredBox>
                )}
              </StyledContent>
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
