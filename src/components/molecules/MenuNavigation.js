import React, { useContext, useEffect } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ImportContactsSharpIcon from '@material-ui/icons/ImportContactsSharp';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import StyledListItem from '../atoms/MenuItem';
import { MenuContext } from '../../context/menuContext';

const nav = [
  {
    label: 'Wydaj klucz',
    icon: <VpnKeyIcon />,
    roles: ['apparitor'],
    path: '/issuekey',
  },
  {
    label: 'Dodaj salę',
    icon: <CreateIcon />,
    roles: ['admin'],
    path: '/addclassroom',
  },
  {
    label: 'Dodaj użytkownika',
    icon: <PersonAddIcon />,
    roles: ['admin'],
    path: '/adduser',
  },
  {
    label: 'Wyszukaj salę',
    icon: <SearchIcon />,
    roles: ['admin', 'user', 'apparitor'],
    path: '/findclassroom',
  },
  {
    label: 'Rejestr wypożyczeń',
    icon: <ImportContactsSharpIcon />,
    roles: ['admin', 'apparitor'],
    path: '/rentalregistry',
  },
  {
    label: 'Twoje wypożyczenia',
    icon: <ImportContactsSharpIcon />,
    roles: ['user'],
    path: '/yourrentals',
  },
];

const StyledNav = styled.nav`
  flex-grow: 1;
`;

const StyledList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin: 5px 0;
  width: 80%;
`;

const MenuNavigation = () => {
  const authContext = useContext(AuthContext);
  const menuContext = useContext(MenuContext);
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    menuContext.setIsMenuOpen(false);
  }, [pathname]);

  return (
    <StyledNav>
      <StyledList>
        <StyledListWrapper>
          {nav.map(
            (el) =>
              el.roles.includes(authContext.authState.user.role) && (
                <StyledLink key={el.path} to={el.path}>
                  <StyledListItem active={pathname.includes(el.path)}>
                    {el.icon}
                    <span>{el.label}</span>
                  </StyledListItem>
                </StyledLink>
              ),
          )}
        </StyledListWrapper>
        <li>
          <StyledListItem
            logout
            as="button"
            type="button"
            aria-label="Wyloguj się z serwisu."
            onClick={authContext.logOut}
          >
            <ExitToAppIcon />
            <span>Wyloguj</span>
          </StyledListItem>
        </li>
      </StyledList>
    </StyledNav>
  );
};

export default MenuNavigation;
