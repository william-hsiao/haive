import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import * as client from '@/apiClient';
import { RouteParams } from '@/routePaths';
import SkillsMatrix from '@/components/SkillsMatrix';

const StyledSkillsMatrix = styled(SkillsMatrix)`
  margin-left: ${(props) => `-${props.theme.mainPadding}`};
  margin-right: ${(props) => `-${props.theme.mainPadding}`};
`;

const MatrixPage: FC = () => {
  const { departmentId } = useParams<RouteParams>();

  const [memberSkills, setMemberSkills] = useState<client.MemberSkill[]>([]);
  const [skillSet, setSkillSet] = useState<client.SkillSetLabels>([]);

  useEffect(() => {
    if (!departmentId) return;
    client
      .getDepartment({ departmentId })
      .then((department) => setSkillSet(department.skillSet));
    client
      .getDepartmentMemberSkills({ departmentId })
      .then((members) => setMemberSkills(members));
  }, [departmentId]);

  return (
    <>
      <h1>Skills Matrix</h1>
      <StyledSkillsMatrix skills={skillSet} memberSkills={memberSkills} />
    </>
  );
};

export default MatrixPage;
