import React, { useState } from 'react';
import styled from 'styled-components';
import ViewTitle from '../components/atoms/ViewTitle';
import ViewWrapper from '../components/atoms/ViewWrapper';
import Loader from '../components/molecules/Loader';
import Checkbox from '../components/molecules/Checkbox';
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
`;

const StyledUserBar = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 50px 50px minmax(200px, 300px) minmax(200px, 300px);
  grid-gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey};
`;

const StyledUserBarElement = styled.div`
  /* width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  margin: 7px 0;
  border-left: 1px solid ${({ theme }) => theme.colors.lightgrey};

  &:first-child {
    border: 0;
  } */
`;

const StyledUserBarCenter = styled(StyledUserBarElement)`
  /* justify-content: center; */
`;

const StyledUserBarText = styled(StyledUserBarElement)`
  /* padding-left: 10px; */
`;

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ViewWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <StyledContainer>
          <div>
            <StyledHeader>
              <ViewTitle>Lista użytkowników</ViewTitle>
            </StyledHeader>
            <StyledContent>
              {users.map((user, i) => (
                <StyledUserBar key={user._id}>
                  <StyledUserBarCenter>
                    <Checkbox type="checkbox" value={user._id} name="user" isListItem="false" />
                  </StyledUserBarCenter>
                  <StyledUserBarCenter>
                    <p>{i + 1}</p>
                  </StyledUserBarCenter>
                  <StyledUserBarText>
                    <p>{user.name}</p>
                  </StyledUserBarText>
                  <StyledUserBarText>
                    <p>{user.surname}</p>
                  </StyledUserBarText>
                </StyledUserBar>
              ))}
            </StyledContent>
          </div>
        </StyledContainer>
      )}
    </ViewWrapper>
  );
};

export default UserList;
