import styled from 'styled-components';

const Wrapper = styled.main`
  height: calc(var(--vh) * 100);

  @media (min-width: 900px) {
    margin-left: 300px;
    width: calc(100vw - 300px);
  }
`;

export default Wrapper;
