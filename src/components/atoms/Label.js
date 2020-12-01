import styled from 'styled-components';

const Label = styled.label`
  font-size: ${({ time }) => (time ? '14px' : '17px')};
  color: ${({ theme }) => theme.colors.dark};
`;

export default Label;
