import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
`;

const StyledAlert = styled.div`
  width: fit-content;
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-rows: 60px 1fr;
  margin: 15px;
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
`;

const StyledHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 50px;
  gap: 10px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
`;

const StyledTitle = styled.h2`
  text-transform: capitalize;
`;

const StyledContent = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.light};
`;

const StyledDesc = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;

const CancelButton = styled(Button).attrs({
  'aria-label': 'Anuluj akcje',
})`
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  border: 3px solid ${({ theme }) => theme.colors.dark};
`;

const AlertTemplate = ({ children, isOpen, type, title, desc }) => {
  const [btns, setBtns] = useState([]);
  const btnsContainer = useRef();

  useEffect(() => {
    if (btnsContainer.current) {
      setBtns(btnsContainer.current.children);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      btns[0].focus();
    }
  }, [isOpen]);

  return (
    <StyledWrapper isOpen={isOpen} role={type} aria-modal="true" aria-labelledby="title">
      <StyledAlert>
        <StyledHeader>
          <StyledTitle id="title">{title}</StyledTitle>
        </StyledHeader>
        <StyledContent>
          <StyledDesc id="desc">{desc}</StyledDesc>
          {children(CancelButton, btnsContainer)}
        </StyledContent>
      </StyledAlert>
    </StyledWrapper>
  );
};

AlertTemplate.propTypes = {
  children: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.string,
};

AlertTemplate.defaultProps = {
  type: 'alertdialog',
};

export default AlertTemplate;
