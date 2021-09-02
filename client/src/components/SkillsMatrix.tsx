import React, { FC } from 'react';
import styled from 'styled-components';

import { MemberSkill, SkillSetLabels } from '@/apiClient';

const Table = styled.div`
  [role='row'] {
    display: flex;
    padding-right: 1rem;

    &:first-child {
      border-top: 1px solid ${(props) => props.theme.colours.grey20};
      position: sticky;
      top: ${(props) => props.theme.headerHeight};
      z-index: 10;

      &::after {
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0),
          ${(props) => props.theme.colours.grey10}
        );
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.5rem;
      }
    }

    &:last-child {
      border-bottom: 1px solid ${(props) => props.theme.colours.grey20};
    }
  }
`;

const Cell = styled.div`
  background-color: ${(props) => props.theme.colours.white};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 6rem;
  word-wrap: break-word;
`;

interface ISkillCell {
  level: number;
}
const SkillCell = styled(Cell)<ISkillCell>`
  background-color: ${(props) => {
    switch (props.level) {
      case 1:
        return props.theme.colours.grey20;
      case 2:
        return props.theme.colours.primary10;
      case 3:
        return props.theme.colours.primary20;
      case 4:
        return props.theme.colours.primary50;
      case 5:
        return props.theme.colours.primary70;
      default:
        return props.theme.colours.grey10;
    }
  }};
  color: ${(props) =>
    props.level > 3 ? props.theme.colours.white : 'inherit'};
`;

interface ICellWrapper {
  left?: string;
}
const CellWrapper = styled.div<ICellWrapper>`
  padding-bottom: 0.5rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  /* First Column */
  &:first-child {
    position: sticky;
    left: ${(props) =>
      props.left
        ? `calc(${props.theme.navSidebarWidth} + ${props.left})`
        : props.theme.navSidebarWidth};
    & > div {
      padding-left: 1rem;
      width: 15rem;
      justify-content: flex-start;
    }

    &::after {
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0),
        ${(props) => props.theme.colours.grey10}
      );
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 0.5rem;
    }
  }

  /* First Row */
  & > [role='th'] {
    min-height: 2rem;
    height: auto;
    align-items: flex-end;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    font-weight: bold;
  }
`;

interface ISkillsMatrix {
  skills: SkillSetLabels;
  memberSkills: MemberSkill[];
  className?: string;
  left?: string;
}
const SkillsMatrix: FC<ISkillsMatrix> = ({
  skills,
  memberSkills,
  className,
  left,
}) => {
  return (
    <Table className={className}>
      <div role="row">
        <CellWrapper left={left}>
          <Cell role="th">Member</Cell>
        </CellWrapper>
        {skills.map((skill, index) => (
          <CellWrapper key={index} left={left}>
            <Cell role="th">{skill}</Cell>
          </CellWrapper>
        ))}
      </div>

      {memberSkills.map((member, index) => (
        <div role="row" key={index}>
          <CellWrapper left={left}>
            <Cell role="td">{member.user.name}</Cell>
          </CellWrapper>
          {skills.map((skill, idx) => (
            <CellWrapper key={idx} left={left}>
              <SkillCell role="td" level={member.skills[skill]}>
                {member.skills[skill]}
              </SkillCell>
            </CellWrapper>
          ))}
        </div>
      ))}
    </Table>
  );
};

export default SkillsMatrix;
