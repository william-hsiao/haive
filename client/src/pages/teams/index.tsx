import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import { Search } from '@material-ui/icons';

import * as client from '@/apiClient';
import { RouteParams, routePaths } from '@/routePaths';
import {
  Sidebar,
  SidebarList,
  SidebarLinkItem,
} from '@/components/layouts/InnerSidebar';
import { TextInput } from '@/components/common';
import Overview from './Overview';
import View from './View';

const Layout = styled.div`
  display: flex;
`;

const SearchBox = styled(TextInput)`
  flex-shrink: 0;
  border-radius: 0;
  border: solid ${(props) => props.theme.colours.grey30};
  border-width: 1px 0 1px 0;
  width: 100%;
`;

const Viewport = styled.div`
  padding: 0 2rem;
  flex-grow: 1;
  margin-left: ${(props) => props.theme.innerSidebarWidth};
`;

const TeamsPage: FC = () => {
  const { departmentId } = useParams<RouteParams>();
  const { path, url } = useRouteMatch();

  const [teams, setTeams] = useState<client.Team[]>([]);
  const [filter, setFilter] = useState('');
  const filteredTeams = useMemo(() => {
    if (!filter) return teams;
    return teams.filter((team) =>
      team.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [teams, filter]);

  useEffect(() => {
    if (!departmentId) return;
    client
      .getDepartmentTeams({ departmentId })
      .then((teams) => setTeams(teams));
  }, [departmentId]);

  return (
    <Layout>
      <Sidebar>
        <SearchBox
          value={filter}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
          placeholder="Filter Teams"
          icon={<Search />}
        />
        <SidebarList>
          <SidebarLinkItem exact to={url}>
            Overview
          </SidebarLinkItem>
          {filteredTeams.map((team, index) => (
            <SidebarLinkItem to={[url, `/${team._id}`].join('')} key={index}>
              {team.name}
            </SidebarLinkItem>
          ))}
        </SidebarList>
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
