import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import * as client from '@/apiClient';
import { RouteParams, routePaths } from '@/routePaths';
import Overview from './Overview';
import View from './View';

const Layout = styled.div`
  display: flex;
`;

const Sidebar = styled.ul`
  flex-shrink: 0;
  border-right: 1px solid ${(props) => props.theme.colours.grey20};
  list-style: none;
  padding-left: 1rem;
  padding-right: 0.5rem;
  width: 15rem;
  margin-left: -${(props) => props.theme.mainPadding};
  margin-top: 0;
`;
const SidebarItem = styled.li`
  margin-bottom: 0.1rem;

  a {
    border-bottom: 1px solid ${(props) => props.theme.colours.white};
    border-top: 1px solid ${(props) => props.theme.colours.white};
    background-color: ${(props) => props.theme.colours.white};
    display: block;
    color: ${(props) => props.theme.colours.text};
    text-decoration: none;
    padding: 0.5rem 0.5rem;
    word-wrap: break-word;

    &:hover {
      background-color: ${(props) => props.theme.colours.primary10};
      border-bottom: 1px solid ${(props) => props.theme.colours.primary40};
      border-top: 1px solid ${(props) => props.theme.colours.primary40};
    }

    &.active {
      background-color: ${(props) => props.theme.colours.primary20};
      border-color: ${(props) => props.theme.colours.primary60};
    }
  }
`;

const Viewport = styled.div`
  padding: 0 2rem;
  flex-grow: 1;
`;

interface ISidebarLink {
  to: string;
  children: React.ReactNode;
  exact?: boolean;
}
const SidebarLink: FC<ISidebarLink> = ({ to, children, exact = false }) => {
  const match = useRouteMatch({
    path: to,
    exact,
  });

  return (
    <SidebarItem>
      <Link to={to} className={match ? 'active' : undefined}>
        {children}
      </Link>
    </SidebarItem>
  );
};

const TeamsPage: FC = () => {
  const { departmentId } = useParams<RouteParams>();
  const { path, url } = useRouteMatch();

  const [teams, setTeams] = useState<client.Team[]>([]);

  useEffect(() => {
    if (!departmentId) return;
    client
      .getDepartmentTeams({ departmentId })
      .then((teams) => setTeams(teams));
  }, [departmentId]);

  return (
    <Layout>
      <Sidebar>
        <SidebarLink exact to={url}>
          Overview
        </SidebarLink>
        {teams.map((team, index) => (
          <SidebarLink to={[url, `/${team._id}`].join('')} key={index}>
            {team.name}
          </SidebarLink>
        ))}
      </Sidebar>

      <Viewport>
        <Switch>
          <Route exact path={path}>
            <Overview teams={teams} />
          </Route>
          <Route path={[path, routePaths.teamId].join('')}>
            <View teams={teams} />
          </Route>
        </Switch>
      </Viewport>
    </Layout>
  );
};

export default TeamsPage;
