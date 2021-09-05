import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;
const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.colours.white};
  box-shadow: ${(props) => props.theme.styles.boxShadow};
  z-index: 50;
`;

interface IDropdown {
  children: ReactNode;
  contents: ReactNode;
  open: boolean;
}
const Dropdown: FC<IDropdown> = ({ children, contents, open }) => {
  return (
    <Wrapper>
      {children}
      {open && <DropdownContainer>{contents}</DropdownContainer>}
    </Wrapper>
  );
};

export default Dropdown;
