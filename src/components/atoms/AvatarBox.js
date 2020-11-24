import styled from 'styled-components';

const AvatarBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 50px;
  border: 5px solid ${({ theme }) => theme.colors.darkblue};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 70%;
    height: 70%;
    fill: ${({ theme }) => theme.colors.darkblue};
  }
`;

export default AvatarBox;
