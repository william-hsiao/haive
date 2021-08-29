import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import * as client from '@/apiClient';
import { RouteParams } from '@/routePaths';
import SkillMatrix from '@/components/SkillsMatrix';
import SkillChart from '@/components/SkillChart';

interface ITeamViewPage {
  teams: client.Team[];
}
const TeamViewPage: FC<ITeamViewPage> = ({ teams }) => {
  const { teamId } = useParams<RouteParams>();

  const team = useMemo(
    () => teams.find((team) => team._id === teamId),
    [teams]
  );

  return (
    <>
      {team && (
        <>
          <h1>{team.name}</h1>

          <SkillMatrix skills={team.skills} memberSkills={team.members} />
          <SkillChart
            skills={team.skills}
            members={team.members.map((member) => ({
              name: member.user.name,
              skills: member.skills,
            }))}
          />
        </>
      )}
    </>
  );
};

export default TeamViewPage;
