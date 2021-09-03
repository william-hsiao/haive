import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { TextInput } from '@/components/common';

// Usage:
//   <Sidebar>
//     <SidebarList>
//       <SidebarListItem />
//     </SidebarList>
//   </Sidebar>

export const Sidebar = styled.div`
  flex-shrink: 0;
  border-right: 1px solid ${(props) => props.theme.colours.grey20};
  background-color: ${(props) => props.theme.colours.grey10};
  display: flex;
  flex-direction: column;
  width: ${(props) => props.theme.innerSidebarWidth};
  position: fixed;
  left: ${(props) => props.theme.navSidebarWidth};
  top: 0;
  bottom: 0;
  padding-top: ${(props) => props.theme.headerHeight};
  z-index: 50;
`;

export const SidebarList = styled.ul`
  flex-grow: 1;
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  overflow: auto;
`;

const SidebarLink = styled(Link)`
  border-bottom: 1px solid ${(props) => props.theme.colours.grey30};
  border-top: 1px solid ${(props) => props.theme.colours.grey30};
  background-color: ${(props) => props.theme.colours.grey10};
  display: block;
  color: ${(props) => props.theme.styles.textDarkColour};
  padding: 1rem 2rem;
  word-wrap: break-word;

  &:hover {
    background-color: ${(props) => props.theme.colours.grey20};
  }

  &.active {
    background-color: ${(props) => props.theme.colours.white};
    border-color: ${(props) => props.theme.colours.grey50};
    font-weight: 600;
  }
`;

interface ISidebarLinkItem {
  to: string;
  children: ReactNode;
  exact?: boolean;
}
export const SidebarLinkItem: FC<ISidebarLinkItem> = ({
  to,
  children,
  exact = false,
}) => {
  const match = useRouteMatch({
    path: to,
    exact,
  });

  return (
    <li>
      <SidebarLink to={to} className={match ? 'active' : undefined}>
        {children}
      </SidebarLink>
    </li>
  );
};
