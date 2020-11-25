import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';
import SubTitle from '../atoms/SubTitle';

const StyledWrapper = styled.div`
  width: 300px;
  height: 400px;
  padding: 10px;
  position: absolute;
  bottom: 0;
  right: 260px;
  background-color: ${({ theme }) => theme.colors.darkblue};
  border-top-left-radius: ${({ theme }) => theme.radius};
  border-top-right-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.light};
  /* border: 3px solid ${({ theme }) => theme.colors.dark}; */
`;

const StyledBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  padding: 3px 5px;
  display: flex;
`;

const StyledTitle = styled(Title)`
  font-size: 25px;
  text-transform: none;
`;

const ClassroomDesc = () => {
  return (
    <StyledWrapper>
      <StyledBox>
        <StyledTitle>aula 02</StyledTitle>
      </StyledBox>
      <StyledBox>
        <SubTitle>Aktualny status</SubTitle>
      </StyledBox>
      <StyledBox>
        <SubTitle>Pojemność</SubTitle>
      </StyledBox>
      <StyledBox>
        <SubTitle>Opis</SubTitle>
      </StyledBox>
    </StyledWrapper>
  );
};

export default ClassroomDesc;
