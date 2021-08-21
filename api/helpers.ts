import Hapi from '@hapi/hapi';

export const namespaceRoutes = (
  namespace: string,
  routes: Hapi.ServerRoute[]
) => routes.map((route) => ({ ...route, path: `${namespace}${route.path}` }));
