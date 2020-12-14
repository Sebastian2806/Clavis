import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeader = styled.header`
  width: 100%;
  padding-left: ${({ paddingLeft }) => paddingLeft};
`;

const StyledTitle = styled.h2`
  font-size: 22px;
`;

const SectionHeader = ({ text, paddingLeft }) => {
  return (
    <StyledHeader paddingLeft={paddingLeft}>
      <StyledTitle as="h2">{text}</StyledTitle>
    </StyledHeader>
  );
};

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
  paddingLeft: PropTypes.string,
};

SectionHeader.defaultProps = {
  paddingLeft: '15px',
};

export default SectionHeader;
