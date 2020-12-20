import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Form, Formik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewTitle from '../components/atoms/ViewTitle';
import ViewWrapper from '../components/atoms/ViewWrapper';
import Loader from '../components/molecules/Loader';
import Checkbox from '../components/molecules/Checkbox';
import IconBox from '../components/atoms/IconBox';
import { users } from '../data';

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

  &:hover .index-number {
    display: none;
  }

  &:hover .checkbox-container {
    display: block;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      & .index-number {
        display: none;
      }

      & .checkbox-container {
        display: block;
      }
    `}
`;

const StyledUserBarElement = styled.div`
  display: flex;
  align-items: center;
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

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ViewWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
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
                    <ViewTitle>Lista użytkowników</ViewTitle>
                  </StyledHeader>
                  <StyledContent>
                    <StyledGridHeader>
                      <StyledIndex>
                        <p>#</p>
                      </StyledIndex>
                      <StyledUserBarElement>
                        <p>Imię</p>
                      </StyledUserBarElement>
                      <StyledUserBarElement>
                        <p>Nazwisko</p>
                      </StyledUserBarElement>
                      <StyledUserBarElement>
                        <p>Usuń</p>
                      </StyledUserBarElement>
                    </StyledGridHeader>
                    {users.map((user, i) => (
                      <StyledUserBar key={user._id} isSelected={values.users_id.includes(user._id)}>
                        <StyledIndex>
                          <p className="index-number">{i + 1}</p>
                          <StyledCheckboxContainer className="checkbox-container">
                            <Checkbox
                              type="checkbox"
                              value={user._id}
                              name="users_id"
                              isListItem="false"
                              onChange={handleChange}
                            />
                          </StyledCheckboxContainer>
                        </StyledIndex>
                        <StyledUserBarElement>
                          <p>{user.name}</p>
                        </StyledUserBarElement>
                        <StyledUserBarElement>
                          <p>{user.surname}</p>
                        </StyledUserBarElement>
                        <StyledUserBarElement>
                          <IconBox type="button" mode="dark">
                            <DeleteIcon />
                          </IconBox>
                        </StyledUserBarElement>
                      </StyledUserBar>
                    ))}
                  </StyledContent>
                </div>
              </StyledContainer>
            </StyledForm>
          )}
        </Formik>
      )}
    </ViewWrapper>
  );
};

export default UserList;
