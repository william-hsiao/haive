import React, { FC, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';

import { SkillSet, SkillSetLabels } from '@/apiClient';

interface ISkillChart {
  skills: SkillSetLabels;
  members: {
    name: string;
    skills: SkillSet;
  }[];
  maintainAspectRatio?: boolean;
}

const SkillChart: FC<ISkillChart> = ({
  skills,
  members,
  maintainAspectRatio = true,
}) => {
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
        animation: false,
        maintainAspectRatio,
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
