import styled from 'styled-components';

const ViewWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    min-height: calc(var(--vh) * 100);
  }
`;

export default ViewWrapper;
