export interface RouteParams {
  departmentId: string;
}

export const routePaths = {
  root: '/',
  login: '/login',
  departmentId: '/:departmentId',
  matrix: '/matrix',
  teams: '/teams',
};
