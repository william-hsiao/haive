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
  user: {
    name: string;
  };
  skills: SkillSet;
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
