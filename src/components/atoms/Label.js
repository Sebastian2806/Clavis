import styled from 'styled-components';

const Label = styled.label`
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightpurple};
`;

export default Label;
