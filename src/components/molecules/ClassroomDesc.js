import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Title from '../atoms/Title';
import IconBox from '../atoms/IconBox';
import SubTitle from '../atoms/SubTitle';
import Button from '../atoms/Button';
import DotStatus from '../atoms/DotStatus';
import { ClassroomContext } from '../../context/classroomsContext';
import { getStatusLabel } from '../../util/helpers';
import ReservationFrom from '../form/ReservationForm';

const scale = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: rotate(1);
  }
`;

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh) * 100);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: fit-content;
  max-height: 450px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${scale} 200ms;
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
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  z-index: 40000;
  background-color: ${({ theme }) => theme.colors.dark};
  border-top-left-radius: ${({ theme }) => theme.radius};
  border-top-right-radius: ${({ theme }) => theme.radius};
`;

const StyledTitle = styled(Title)`
  font-size: 25px;
  text-transform: none;
  color: ${({ theme }) => theme.colors.light};
`;

const StyledContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 3px solid ${({ theme }) => theme.colors.dark};
  border-top: 0;
  border-bottom-left-radius: ${({ theme }) => theme.radius};
  border-bottom-right-radius: ${({ theme }) => theme.radius};
`;

const StyledSubtitle = styled(SubTitle)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  color: ${({ theme }) => theme.colors.disabled};
  font-size: 20px;
  padding-left: 5px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledStatusContainer = styled.div`
  display: flex;
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  margin: 0;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const StyledDotStatus = styled(DotStatus)`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const ClassroomDesc = () => {
  const classroomContext = useContext(ClassroomContext);
  const [classroom, setClassroom] = useState({});
  const [show, setShow] = useState(true);
  const { classId } = useParams();

  useEffect(() => {
    const cl = classroomContext.getClassroomById(classId);
    const [name] = getStatusLabel(cl.status);
    setClassroom({ ...cl, label: name.label });
  }, []);

  return (
    <>
      <StyledWrapper>
        <StyledContainer>
          <StyledHeader>
            <StyledTitle>{classroom.number}</StyledTitle>
            <Link to="/findclassroom" aria-label="Wróć do przeglądania sal">
              <IconBox lightHover>
                <CloseIcon />
              </IconBox>
            </Link>
          </StyledHeader>

          <StyledContent>
            {show ? (
              <ReservationFrom id={classroom.id} />
            ) : (
              <>
                <StyledSubtitle>Aktualny status</StyledSubtitle>
                <StyledStatusContainer>
                  <StyledDotStatus type={classroom.status} />
                  <StyledParagraph>{classroom.label}</StyledParagraph>
                </StyledStatusContainer>
                <StyledSubtitle>Typ</StyledSubtitle>
                <StyledParagraph>{classroom.type}</StyledParagraph>
                <StyledSubtitle>Pojemność</StyledSubtitle>
                <StyledParagraph>{classroom.capacity}</StyledParagraph>
                <StyledSubtitle>Opis</StyledSubtitle>
                <StyledParagraph>{classroom.description}</StyledParagraph>
                <StyledButton onClick={() => setShow(true)}>Zarezerwuj</StyledButton>
              </>
            )}
          </StyledContent>
        </StyledContainer>
      </StyledWrapper>
      <StyledBackground />
    </>
  );
};

export default ClassroomDesc;
