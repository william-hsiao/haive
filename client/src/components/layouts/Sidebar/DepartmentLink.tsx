import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Departments } from '@/apiClient';
import { IDepartmentMenu } from './DepartmentMenu';

const DepartmentLinkContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const DepartmentIcon = styled.div`
  display: inline-block;
`;

const Icon = styled.div`
  height: 4rem;
  width: 4rem;
  background-color: ${(props) => props.theme.colours.primary20};
`;

interface IDepartmentLink {
  department: Departments[number];

  setMenuParams: (params: IDepartmentMenu | undefined) => void;
}
const DepartmentLink: FC<IDepartmentLink> = ({ department, setMenuParams }) => {
  const containerEl = useRef(null);

  return (
    <DepartmentLinkContainer
      ref={containerEl}
      onMouseOver={() =>
        setMenuParams({
          department,
          // @ts-ignore
          y: containerEl.current!.getBoundingClientRect().y,
        })
      }
      onMouseLeave={() => setMenuParams(undefined)}
    >
      <DepartmentIcon>
        <Link to={`/${department._id}`}>
          <Icon />
        </Link>
      </DepartmentIcon>
    </DepartmentLinkContainer>
  );
};

export default DepartmentLink;
