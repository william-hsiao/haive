import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routePaths } from '@/routePaths';

const Container = styled.nav`
  background-color: ${(props) => props.theme.primary};
  bottom: 0;
  color: ${(props) => props.theme.primaryText};
  position: fixed;
  top: 0;
  width: ${(props) => props.theme.sidebarWidth};
`;

const LogoLink = styled(Link)`
  display: block;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
`;

const NavLink = styled(Link)`
  border-bottom: 1px solid ${(props) => props.theme.primaryDark};
  cursor: pointer;
  display: block;
  padding: 1.5rem 2rem;
  transition: box-shadow 0.2s ease;

  color: ${(props) => props.theme.primaryText};
  font-weight: 800;
  text-decoration: none;

  &:not(:last-of-type) {
    border-top: 1px solid ${(props) => props.theme.primaryDark};
  }

  &:hover {
    box-shadow: 0 0 5px ${(prop) => prop.theme.primaryDark} inset;
  }
`;

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <Container className={className}>
      <LogoLink to={routePaths.root}>Logo Placeholder</LogoLink>

      <NavLink to={routePaths.matrix}>Skills Matrix</NavLink>
      <NavLink to={routePaths.teams}>Teams</NavLink>
    </Container>
  );
};

export default Sidebar;
