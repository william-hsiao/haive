import axios, { AxiosRequestConfig } from 'axios';

export type Departments = {
  _id: string;
  name: string;
}[];

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
