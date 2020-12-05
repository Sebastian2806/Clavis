import styled from 'styled-components';
import CardBox from './CardBox';

const CardHeader = styled(CardBox)`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 24px;
    font-weight: normal;
  }
`;

export default CardHeader;
