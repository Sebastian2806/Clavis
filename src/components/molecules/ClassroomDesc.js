import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Title from '../atoms/Title';
import IconBox from '../atoms/IconBox';
import SubTitle from '../atoms/SubTitle';
import Button from '../atoms/Button';
import DotStatus from '../atoms/DotStatus';

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
  height: 400px;
  margin: 15px;
  border: 3px solid ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  flex-direction: column;
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
  background-color: ${({ theme }) => theme.colors.dark};
  padding: 10px;
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
  return (
    <>
      <StyledWrapper>
        <StyledContainer>
          <StyledHeader>
            <StyledTitle>aula 02</StyledTitle>
            <Link to="/findclassroom" aria-label="Wróć do przeglądania sal">
              <IconBox>
                <CloseIcon />
              </IconBox>
            </Link>
          </StyledHeader>
          <StyledContent>
            <StyledSubtitle>Aktualny status</StyledSubtitle>
            <StyledStatusContainer>
              <StyledDotStatus type="free" />
              <StyledParagraph>wolna</StyledParagraph>
            </StyledStatusContainer>
            <StyledSubtitle>Typ</StyledSubtitle>
            <StyledParagraph>aula</StyledParagraph>
            <StyledSubtitle>Pojemność</StyledSubtitle>
            <StyledParagraph>100</StyledParagraph>
            <StyledSubtitle>Opis</StyledSubtitle>
            <StyledParagraph>
              Litwo! Ojczyzno moja! Ty jesteś jak zdrowie. Ile cię stracił. Dziś człowieka nie mógł najprędzej,
              niedzielne ubrani piękniejsze jest zagadką, młódź lubi zagadki. Roztargniony, do zdrowia powróciłaś cudem
              na rywala coraz głośniejsza kłótnia o kusego charta którego posiadaniem pan dla zabawki
            </StyledParagraph>
            <StyledButton>Sprawdź dostępność</StyledButton>
          </StyledContent>
        </StyledContainer>
      </StyledWrapper>
      <StyledBackground />
    </>
  );
};

export default ClassroomDesc;
