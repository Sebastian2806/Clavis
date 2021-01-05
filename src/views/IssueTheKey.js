import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Loader from '../components/molecules/Loader';
import ViewWrapper from '../components/atoms/ViewWrapper';
import AvatarBox from '../components/atoms/AvatarBox';
import IssueTheKeyForm from '../components/form/IssueTheKeyForm';
import { FetchContext } from '../context/fetchContext';

const IssueTheKey = () => {
  const fetchContext = useContext(FetchContext);
  const [users, setUsers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const usersAndClassroms = await fetchContext.authAxios.get('apparitor/reservation/fast/data');
        setClassrooms(usersAndClassroms.data.classrooms.map((el) => ({ ...el, id: el._id })));
        setUsers(usersAndClassroms.data.users.map((el) => ({ ...el, id: el._id })));
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, []);

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
