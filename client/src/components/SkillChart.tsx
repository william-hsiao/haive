import React, { FC, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';

import { SkillSet, SkillSetLabels } from '@/apiClient';

interface ISkillChart {
  skills: SkillSetLabels;
  members: {
    name: string;
    skills: SkillSet;
  }[];
}

const SkillChart: FC<ISkillChart> = ({ skills, members }) => {
  const datasets = useMemo(
    () =>
      members.map((member) => ({
        label: member.name,
        data: skills.map((skill) => member.skills[skill]),
      })),
    [members]
  );

  return (
    <Radar
      data={{
        labels: skills,
        datasets,
      }}
      options={{
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
        },
      }}
    />
  );
};

export default SkillChart;
