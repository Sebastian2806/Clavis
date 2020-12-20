import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div``;

const AlertTemplate = ({ children, isOpen, type }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

AlertTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

AlertTemplate.defaultProps = {
  type: 'alertdialog',
};

export default AlertTemplate;
