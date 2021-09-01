import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AccountCircle, Settings } from '@material-ui/icons';

import { routePaths } from '@/routePaths';
import { useGlobal } from '@/context/GlobalContext';
import DepartmentMenu, { IDepartmentMenu } from './DepartmentMenu';
import DepartmentLink from './DepartmentLink';

const Container = styled.nav`
  background-color: ${(props) => props.theme.colours.primary80};
  bottom: 0;
  box-sizing: border-box;
  color: ${(props) => props.theme.styles.textLightColour};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: ${(props) => props.theme.sidebarWidth};
`;

const HeaderContainer = styled.div`
  flex-shrink: 0;
`;
const FooterContainer = styled.div`
  flex-shrink: 0;
`;
const Divider = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colours.white};
  margin: 1rem -0.5rem;
`;
const Icon = styled.div`
  height: 4rem;
  width: 4rem;
  background-color: ${(props) => props.theme.colours.primary20};
`;
const IconWrapper = styled.div`
  height: 4rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  svg {
    color: ${(props) => props.theme.colours.white};
    font-size: 2rem;
  }
`;

const DepartmentsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: visible;
  margin-right: -1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

interface ISidebar {
  className?: string;
}
const Sidebar: FC<ISidebar> = ({ className }) => {
  const { departments } = useGlobal();

  const [menuParams, setMenuParams] = useState<IDepartmentMenu>();

  return (
    <Container className={className}>
      <HeaderContainer>
        <Link to={routePaths.root}>
          <Icon />
        </Link>
      </HeaderContainer>

      <Divider />

      <DepartmentsContainer>
        {departments.map((dpt, idx) => (
          <DepartmentLink
            key={idx}
            department={dpt}
            setMenuParams={setMenuParams}
          />
        ))}
      </DepartmentsContainer>
      <DepartmentMenu params={menuParams} />

      <Divider />

      <FooterContainer>
        <IconWrapper>
          <AccountCircle />
        </IconWrapper>
        <IconWrapper>
          <Settings />
        </IconWrapper>
      </FooterContainer>
    </Container>
  );
};

export default Sidebar;
