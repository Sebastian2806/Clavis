import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Field, Form } from 'formik';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Loader from '../components/molecules/Loader';
import ViewWrapper from '../components/atoms/ViewWrapper';
import { issueData } from '../data';
import AvatarBox from '../components/atoms/AvatarBox';
import IssueTheKeyForm from '../components/form/IssueTheKeyForm';

const IssueTheKey = () => {
  const [users, setUsers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
    setUsers(issueData.users);
    setClassrooms(issueData.classrooms);
  }, []);

  const StyledBox = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `;

  const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 300px;
    padding: 30px 0;
  `;

  const StyledAvatarContainer = styled.div`
    width: 100%;
    padding: 30px 15px;
    display: flex;
    justify-content: center;
  `;

  return (
    <ViewWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <StyledBox>
          <StyledContainer>
            <StyledAvatarContainer>
              <AvatarBox>
                <VpnKeyIcon />
              </AvatarBox>
            </StyledAvatarContainer>
            <IssueTheKeyForm users={users} classrooms={classrooms} />
          </StyledContainer>
        </StyledBox>
      )}
    </ViewWrapper>
  );
};

export default IssueTheKey;
