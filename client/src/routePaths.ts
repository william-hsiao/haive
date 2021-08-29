export interface RouteParams {
  departmentId?: string;
  teamId?: string;
}

export const routePaths = {
  root: '/',
  login: '/login',
  departmentId: '/:departmentId',
  matrix: '/matrix',
  teams: '/teams',
  teamId: '/:teamId',
};
