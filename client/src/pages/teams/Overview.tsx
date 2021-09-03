import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';

import * as client from '@/apiClient';
import { Button } from '@/components/common';
import SkillChart from '@/components/SkillChart';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 500px));
  grid-auto-rows: minmax(auto, 525px);
  gap: 2rem;
`;
const TeamPanel = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  .header {
    align-items: center;
    display: flex;
    border-bottom: 1px solid ${(props) => props.theme.colours.primary80};
    padding: 1rem;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      padding: 0;
      flex-grow: 1;
    }

    .button {
      flex-shrink: 0;
    }
  }

  .chartContainer {
    flex-grow: 1;
  }
`;

interface ITeamsOverview {
  teams: client.Team[];
}
const TeamsOverviewPage: FC<ITeamsOverview> = ({ teams }) => {
  const { url } = useRouteMatch();

  return (
    <>
      <h1>Teams Overview</h1>
      <Grid>
        {teams.map((team, index) => (
          <TeamPanel key={index}>
            <div className="header">
              <h3>{team.name}</h3>
              <Link to={[url, `/${team._id}`].join('')}>
                <Button className="button" label="View" />
              </Link>
            </div>
            <div className="chartContainer">
              <SkillChart
                skills={team.skills}
                members={team.members.map((member) => ({
                  name: member.user.name,
                  skills: member.skills,
                }))}
                maintainAspectRatio={false}
              />
            </div>
          </TeamPanel>
        ))}
      </Grid>
    </>
  );
};

export default TeamsOverviewPage;
