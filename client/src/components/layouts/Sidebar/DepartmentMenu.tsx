import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Departments } from '@/apiClient';
import { routePaths } from '@/routePaths';

const DepartmentMenuContainer = styled.div<{ y: number }>`
  position: absolute;
  left: 100%;
  top: ${(props) => `${props.y}px`};
  width: 15rem;
  box-shadow: 0 0 0.6rem ${(props) => props.theme.colours.grey60};

  .header {
    background-color: ${(props) => props.theme.colours.primary80};
    color: ${(props) => props.theme.colours.white};
    padding: 0.5rem 1rem;
    font-weight: 600;
  }
  .menuItem {
    color: ${(props) => props.theme.styles.textColour};
    background-color: ${(props) => props.theme.colours.white};
    display: block;
    padding: 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colours.grey50};
    }

    &:hover {
      background-color: ${(props) => props.theme.colours.grey20};
    }
  }
`;

export interface IDepartmentMenu {
  department: Departments[number];
  y: number;
}
const DepartmentMenu: FC<{ params?: IDepartmentMenu }> = ({ params }) => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState<IDepartmentMenu>();
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const closeMenu = () => {
    setData(undefined);
    setHovered(false);
  };

  useEffect(() => {
    if (timerId) clearTimeout(timerId);

    if (hovered) return;
    if (params) {
      setData(params);
      return;
    }

    setTimerId(setTimeout(() => closeMenu(), 100));
  }, [params, hovered]);

  return (
    <>
      {data && (
        <DepartmentMenuContainer
          y={data.y}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="header">{data.department.name}</div>
          <Link
            className="menuItem"
            to={`/${data.department._id}${routePaths.matrix}`}
            onClick={() => closeMenu()}
          >
            Skills Matrix
          </Link>
          <Link
            className="menuItem"
            to={`/${data.department._id}${routePaths.teams}`}
            onClick={() => closeMenu()}
          >
            Teams
          </Link>
        </DepartmentMenuContainer>
      )}
    </>
  );
};

export default DepartmentMenu;
