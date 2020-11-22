import React, { useContext } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr) 25px;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
  padding-top: 10px;

  @media (min-width: 600px) {
    padding-top: 30px;
  }
`;

const StyledAvatarBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: 2px solid ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 90%;
    height: 90%;
  }
`;

const StyledUserName = styled.h2`
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
`;

const StyledRole = styled.p`
  text-transform: uppercase;
  margin: 0;
  font-size: 15px;
`;

const MenuUserInfo = () => {
  const authContext = useContext(AuthContext);
  const roles = [
    {
      value: 'admin',
      label: 'administrator',
    },
    {
      value: 'user',
      label: 'użytkownik',
    },
    {
      value: 'apparitor',
      label: 'wydający',
    },
  ];

  const role = roles.find((el) => el.value === authContext.authState.user.role);

  return (
    <StyledWrapper>
      <StyledAvatarBox>
        <PersonIcon />
      </StyledAvatarBox>
      <StyledUserName>
        <span>{authContext.authState.user.name}</span>
        <span>{authContext.authState.user.surname}</span>
      </StyledUserName>
      <StyledRole>{role.label}</StyledRole>
    </StyledWrapper>
  );
};

export default MenuUserInfo;
