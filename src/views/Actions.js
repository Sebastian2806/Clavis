import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/molecules/Header';
import UserIcon from '../assets/icon/user.svg';
import AdduserIcon from '../assets/icon/adduser.svg';
import AddclassroomIcon from '../assets/icon/addclassroom.svg';

const StyledWrapper = styled.div`
  min-width: 100%;
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 30px;

  @media (min-width: 600px) {
    padding-top: 50px;
  }
`;

const StyledContent = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledAboutUserBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 250px;
`;

const StyledIcon = styled.img`
  margin-bottom: 15px;
`;

const StyledNameBox = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const StyledName = styled.p`
  margin: 0;
  text-align: center;
  font-size: 31px;
  color: ${({ theme }) => theme.colors.light};
`;

const StyledRole = styled.p`
  margin: 0;
  margin-top: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.light};
  font-size: 13px;
  text-align: center;
`;

const StyledActionBox = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledAction = styled.li`
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  width: 330px;
  height: 120px;
  margin: 10px;
  font-size: 25px;
  background-color: ${({ theme }) => theme.colors.darkblue};
`;

const StyledActionIcon = styled.img`
  justify-self: center;
`;

const Actions = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  return (
    <>
      <Header />
      <StyledWrapper>
        <StyledContent>
          <StyledAboutUserBox>
            <StyledIcon src={UserIcon} alt="" />
            <StyledNameBox>
              <StyledName>{user.name}&nbsp;</StyledName>
              <StyledName>{user.surname}</StyledName>
            </StyledNameBox>
            <StyledRole>administrator</StyledRole>
          </StyledAboutUserBox>
          <StyledActionBox>
            <Link to="/addclassroom">
              <StyledAction>
                <StyledActionIcon src={AdduserIcon} alt="" />
                <span>Dodaj sale</span>
              </StyledAction>
            </Link>
            <Link to="/adduser">
              <StyledAction>
                <StyledActionIcon src={AddclassroomIcon} alt="" />
                <span>Dodaj użytkownika</span>
              </StyledAction>
            </Link>
          </StyledActionBox>
        </StyledContent>
      </StyledWrapper>
    </>
  );
};

export default Actions;
