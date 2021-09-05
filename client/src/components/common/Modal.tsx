import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => props.theme.navSidebarWidth};
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  padding: 2rem;
  z-index: 100;
  cursor: pointer;
`;

const Container = styled.div`
  margin: auto;
  background-color: ${(props) => props.theme.colours.white};
  box-shadow: ${(props) => props.theme.styles.boxShadow};
  padding: 1rem;
  border-radius: ${(props) => props.theme.styles.borderRadius};
  cursor: auto;
`;

interface IModal {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}
const Modal: FC<IModal> = ({ open, children, onClose }) => {
  return (
    <>
      {open && (
        <Overlay onClick={() => onClose()}>
          <Container>{children}</Container>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
