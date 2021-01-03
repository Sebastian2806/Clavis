import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Form, Formik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewTitle from '../components/atoms/ViewTitle';
import ViewWrapper from '../components/atoms/ViewWrapper';
import Loader from '../components/molecules/Loader';
import Checkbox from '../components/molecules/Checkbox';
import IconBox from '../components/atoms/IconBox';
// import { users } from '../data';
import AlertTemplate from '../components/templates/AlertTemplate';
import Button from '../components/atoms/Button';
import { FetchContext } from '../context/fetchContext';
import { AuthContext } from '../context/authContext';

const StyledContainer = styled.div`
  width: 100%;
  padding: 30px 15px;
  flex-grow: 1;
  display: flex;
  justify-content: center;

  & > div {
    width: 100%;
    max-width: 1000px;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledError = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 17px;
  font-weight: bold;
`;

const StyledContent = styled.div`
  width: 100%;
  font-size: 18px;
`;

const StyledGridHeader = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 40px 1fr 1fr 40px;
  grid-auto-rows: 50px;
  grid-gap: 15px;
  margin: 3px 0;
  transition: background-color 100ms;
  padding: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey};
  font-weight: bold;
`;

const StyledUserBar = styled(StyledGridHeader)`
  border: 0;
  border-radius: ${({ theme }) => theme.radius};
  font-weight: normal;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightgrey};
  }
`;

const StyledUserBarElement = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

const StyledIndex = styled(StyledUserBarElement)`
  justify-self: center;
`;

const StyledCheckboxContainer = styled.div`
  display: none;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  justify-content: center;
  gap: 10px;
`;

const UserList = () => {
  const fetchContext = useContext(FetchContext);
  const { isAdmin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', surname: '', _id: '' });
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState({ is: false, msg: 'Wystąpił błąd' });
  const [users, setUsers] = useState([]);
  const firstEL = useRef();

  const handleDelete = (is, name = '', surname = '', _id = '') => {
    setIsOpen(is);
    setCurrentUser({ name, surname, _id });
  };

  const deleteUser = async (id) => {
    setError({ is: false, msg: 'Wystąpił błąd' });
    try {
      setIsLoading(true);
      await fetchContext.authAxios.delete('admin/deleteuser', {
        data: { userToDelete: id },
      });
    } catch (err) {
      if (err.response.data && err.response.data.error && err.response.data.error.message)
        setError({ is: true, msg: err.response.data.error.message });
      else setError({ is: true, msg: 'Wystąpił błąd' });
    }
    setRemove((prevState) => !prevState);
    handleDelete(false);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const cl = await fetchContext.authAxios.get('apparitor/users');
        setUsers(cl.data.users);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, [remove]);

  useEffect(() => {
    if (firstEL && isOpen === false && users && users.lenght > 0) firstEL.current.focus();
  }, [firstEL, isOpen]);

  return (
    <ViewWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <>
          <Formik
            initialValues={{
              users_id: [],
            }}
          >
            {({ values, handleChange }) => (
              <StyledForm>
                <StyledContainer>
                  <div>
                    <StyledHeader>
                      <ViewTitle id="user_list_title">Lista użytkowników</ViewTitle>
                      {error.is && <StyledError>{error.msg}</StyledError>}
                    </StyledHeader>
                    <StyledContent
                      role="grid"
                      aria-colcount={isAdmin() ? '4' : '3'}
                      aria-rowcount={users.length}
                      aria-labelledby="user_list_title"
                    >
                      <StyledGridHeader role="row" aria-rowindex="1">
                        <StyledIndex role="columnheader" aria-colindex="1" aria-sort="none">
                          <p>#</p>
                        </StyledIndex>
                        <StyledUserBarElement role="columnheader" aria-colindex="2" aria-sort="none">
                          <p>Imię</p>
                        </StyledUserBarElement>
                        <StyledUserBarElement role="columnheader" aria-colindex="3" aria-sort="none">
                          <p>Nazwisko</p>
                        </StyledUserBarElement>
                        {isAdmin() && (
                          <StyledUserBarElement role="columnheader" aria-colindex="4" aria-sort="none">
                            <p>Usuń</p>
                          </StyledUserBarElement>
                        )}
                      </StyledGridHeader>
                      {users.map((user, i) => (
                        <StyledUserBar
                          key={user._id}
                          isSelected={values.users_id.includes(user._id)}
                          role="row"
                          aria-rowindex={2 + i}
                        >
                          <StyledIndex role="gridcell" aria-colindex="1">
                            <p className="index-number">{i + 1}</p>
                            <StyledCheckboxContainer className="checkbox-container">
                              <Checkbox
                                type="checkbox"
                                value={user._id}
                                name="users_id"
                                isListItem={false}
                                onChange={handleChange}
                              />
                            </StyledCheckboxContainer>
                          </StyledIndex>
                          <StyledUserBarElement role="gridcell" aria-colindex="2">
                            <p>{user.name}</p>
                          </StyledUserBarElement>
                          <StyledUserBarElement role="gridcell" aria-colindex="3">
                            <p>{user.surname}</p>
                          </StyledUserBarElement>
                          {isAdmin() && (
                            <StyledUserBarElement role="gridcell" aria-colindex="4">
                              <IconBox
                                type="button"
                                mode="dark"
                                aria-label={`Usuń użytkownika ${user.name} ${user.surname}`}
                                title={`Usuń użytkownika ${user.name} ${user.surname}`}
                                onClick={() => handleDelete(true, user.name, user.surname, user._id)}
                                userId={user._is}
                                ref={i === 0 ? firstEL : null}
                              >
                                <DeleteIcon />
                              </IconBox>
                            </StyledUserBarElement>
                          )}
                        </StyledUserBar>
                      ))}
                    </StyledContent>
                  </div>
                </StyledContainer>
              </StyledForm>
            )}
          </Formik>
          <AlertTemplate
            isOpen={isOpen}
            title="potwierdzenie"
            desc={`Czy na pewno chcesz usunąć użytkownika ${currentUser.name} ${currentUser.surname}?`}
          >
            {(CancelButton, btnContainer) => (
              <StyledBox ref={btnContainer}>
                <CancelButton onClick={() => handleDelete(false)}>Anuluj</CancelButton>
                <Button
                  aria-label={`Usuń użytkownika ${currentUser.name} ${currentUser.surname}`}
                  title={`Usuń użytkownika ${currentUser.name} ${currentUser.surname}`}
                  onClick={() => deleteUser(currentUser._id)}
                  cancel
                >
                  Usuń
                </Button>
              </StyledBox>
            )}
          </AlertTemplate>
        </>
      )}
    </ViewWrapper>
  );
};

export default UserList;
