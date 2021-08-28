import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routePaths } from '@/routePaths';
import { useGlobal } from '@/context/GlobalContext';

const Container = styled.nav`
  background-color: ${(props) => props.theme.colours.primary60};
  bottom: 0;
  color: ${(props) => props.theme.colours.textLight};
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
  background-color: ${(props) => props.theme.colours.primary50};
  border: 1px solid ${(props) => props.theme.colours.primary50};
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  padding: 1.5rem 2rem;
  transition: box-shadow 0.2s ease;

  color: ${(props) => props.theme.colours.textLight};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    box-shadow: 0 0 5px ${(props) => props.theme.colours.primary60} inset;
    border-color: ${(props) => props.theme.colours.primary60};
  }
`;
const DepartmentSubLink = styled(DepartmentLink)`
  background-color: ${(props) => props.theme.colours.primary40};
  border-color: ${(props) => props.theme.colours.primary40};
  color: ${(props) => props.theme.colours.textDark};
  padding: 1rem 2rem 1rem 3rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colours.primary50};
  }
`;

interface SidebarProps {
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { departments } = useGlobal();

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
