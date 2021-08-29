import axios, { AxiosRequestConfig } from 'axios';

export type SkillSetLabels = string[];
export type SkillSet = {
  [key: string]: number;
};

export type Departments = {
  _id: string;
  name: string;
}[];
export type Department = {
  _id: string;
  name: string;
  skillSet: SkillSetLabels;
};
export type MemberSkill = {
  _id: string;
  user: {
    name: string;
  };
  skills: SkillSet;
};
export type Team = {
  _id: string;
  name: string;
  members: MemberSkill[];
  skills: SkillSetLabels;
};

const client = axios.create({
  baseURL: `${process.env.API_ENDPOINT}/api/`,
});

const request = async <T>(payload: AxiosRequestConfig): Promise<T> => {
  const response = await client.request<T>(payload);
  // TODO: Add error handling

  return response.data;
};

export const getDepartments = (): Promise<Departments> => {
  return request({ method: 'GET', url: '/departments' });
};

interface IGetDepartment {
  departmentId: string;
}
export const getDepartment = ({
  departmentId,
}: IGetDepartment): Promise<Department> => {
  return request({ method: 'GET', url: `/department/${departmentId}` });
};

interface IGetDepartmentMemberSkills {
  departmentId: string;
}
export const getDepartmentMemberSkills = ({
  departmentId,
}: IGetDepartmentMemberSkills): Promise<MemberSkill[]> => {
  return request({ method: 'GET', url: `/department/${departmentId}/members` });
};

interface IGetDepartmentTeams {
  departmentId: string;
}
export const getDepartmentTeams = ({
  departmentId,
}: IGetDepartmentTeams): Promise<Team[]> => {
  return request({ method: 'GET', url: `/department/${departmentId}/teams` });
};
