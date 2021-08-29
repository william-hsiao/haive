import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import * as client from '@/apiClient';
import SkillChart from '@/components/SkillChart';

interface ITeamsOverview {
  teams: client.Team[];
}

const TeamsOverviewPage: FC<ITeamsOverview> = ({ teams }) => {
  return (
    <>
      <h1>Teams Overview</h1>
      {teams.map((team, index) => (
        <SkillChart
          key={index}
          skills={team.skills}
          members={team.members.map((member) => ({
            name: member.user.name,
            skills: member.skills,
          }))}
        />
      ))}
    </>
  );
};

export default TeamsOverviewPage;
