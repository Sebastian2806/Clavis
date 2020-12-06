import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Title from '../atoms/Title';
import DotStatus from '../atoms/DotStatus';

const StyledClassroom = styled.div`
  height: 100px;
  border-radius: ${({ theme }) => theme.radius};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.dark};
  transition: background-color 100ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightpurple};
  }
`;

const StyledTitleBox = styled.div`
  padding: 10px;
  padding-bottom: 0;
  height: 50%;
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  font-size: 25px;
  text-transform: none;
  color: ${({ theme }) => theme.colors.dark}; ;
`;

const StyledCapacityBox = styled(StyledTitleBox)`
  padding: 10px;
  padding-top: 0;
`;

const StyledParagraph = styled.p`
  margin: 0;
  font-size: 21px;
  align-self: flex-end;
  display: flex;
  align-items: center;

  & > span {
    margin-left: 5px;
  }
`;

const Classroom = ({ number, label, status, capacity }) => (
  <StyledClassroom key={number}>
    <StyledTitleBox>
      <DotStatus type={status} title={`status sali nr ${number} to ${label}`} />
      <StyledTitle as="h3">{number}</StyledTitle>
    </StyledTitleBox>
    <StyledCapacityBox>
      <StyledParagraph>
        <PeopleAltIcon />
        <span>{capacity}</span>
      </StyledParagraph>
    </StyledCapacityBox>
  </StyledClassroom>
);

Classroom.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default Classroom;
