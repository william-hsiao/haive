import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routePaths } from '@/routePaths';
import { useGlobal } from '@/context/GlobalContext';

const Container = styled.nav`
  background-color: ${(props) => props.theme.primaryDark};
  bottom: 0;
  color: ${(props) => props.theme.primaryText};
  position: fixed;
  top: 0;
  width: ${(props) => props.theme.sidebarWidth};
`;

const LogoLink = styled(Link)`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.headerHeight};
  justify-content: center;
`;

const DepartmentLinksContainer = styled.div`
  &:not(:last-child) {
    overflow-y: auto;
  }
`;
const DepartmentLinksGroup = styled.div`
  margin-bottom: 0.5rem;
`;
const DepartmentLink = styled(Link)`
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  padding: 1.5rem 2rem;
  transition: box-shadow 0.2s ease;

  color: ${(props) => props.theme.primaryText};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    box-shadow: 0 0 5px ${(props) => props.theme.primaryDark} inset;
    border-color: ${(props) => props.theme.primaryDark};
  }
`;
const DepartmentSubLink = styled(DepartmentLink)`
  background-color: ${(props) => props.theme.primaryLight};
  border-color: ${(props) => props.theme.primaryLight};
  color: ${(props) => props.theme.primaryLightText};
  padding: 1rem 2rem 1rem 3rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.primary};
  }
`;

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { departments, selectedDepartmentId } = useGlobal();

  return (
    <Container className={className}>
      <LogoLink to={routePaths.root}>Logo Placeholder</LogoLink>

      <DepartmentLinksContainer>
        {departments.map((dpt, idx) => (
          <DepartmentLinksGroup key={idx}>
            <DepartmentLink to={`/${dpt._id}`}>{dpt.name}</DepartmentLink>
            <DepartmentSubLink to={`/${dpt._id}${routePaths.matrix}`}>
              Skills Matrix
            </DepartmentSubLink>
            <DepartmentSubLink to={`/${dpt._id}${routePaths.teams}`}>
              Teams
            </DepartmentSubLink>
          </DepartmentLinksGroup>
        ))}
      </DepartmentLinksContainer>
    </Container>
  );
};

export default Sidebar;
