import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form, Field } from 'formik';
import Title from '../atoms/Title';
import IconBox from '../atoms/IconBox';
import SubTitle from '../atoms/SubTitle';
import Button from '../atoms/Button';
import DotStatus from '../atoms/DotStatus';
import { ClassroomContext } from '../../context/classroomsContext';
import { getStatusLabel } from '../../util/helpers';
import TextInput from './TextInput';

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

const StyledInput = styled.input`
  width: 65px;
  height: 45px;
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.colors.dark};
  font-size: 19px;
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.radius};

  &:hover,
  &:focus {
    background-color: #f2f4f5;
  }
`;

const StyledTimeBox = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const StyledTimeSpan = styled.span`
  font-size: 45px;
  padding: 0 12px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFrom = styled(Form)`
  width: fit-content;
`;

const ClassroomDesc = () => {
  const classroomContext = useContext(ClassroomContext);
  const [classroom, setClassroom] = useState({});
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(true);
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
              <IconBox>
                <CloseIcon />
              </IconBox>
            </Link>
          </StyledHeader>

          <StyledContent>
            {show ? (
              <FormContainer>
                <Formik
                  initialValues={{
                    date: '',
                    startAt: '',
                    endAt: '',
                  }}
                >
                  {({ values, errors, touched, handleChange, isSubmitting }) => (
                    <StyledFrom>
                      <Field
                        as={TextInput}
                        name="date"
                        label="Dzień"
                        placeholder="DD-MM-YYYY"
                        date
                        error={errors.date && touched.date ? errors.date : ''}
                      />
                      <StyledTimeBox>
                        <TextInput
                          value={values.startAt}
                          onChange={handleChange}
                          input={<StyledInput type="text" />}
                          name="startAt"
                          aria-label="Początek wynajęcia sali"
                          placeholder="np.: 17:35"
                          label="Początek"
                          time
                        />
                        <StyledTimeSpan>-</StyledTimeSpan>
                        <TextInput
                          value={values.endAt}
                          onChange={handleChange}
                          input={<StyledInput type="text" />}
                          name="endAt"
                          aria-label="Koniec wynajęcia sali"
                          placeholder="np.: 19:05"
                          label="Koniec"
                          time
                        />
                      </StyledTimeBox>
                      {/* pattern="^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$" */}
                      <StyledButton>Zarezerwuj</StyledButton>
                    </StyledFrom>
                  )}
                </Formik>
              </FormContainer>
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
