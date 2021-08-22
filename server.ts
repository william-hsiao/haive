import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

import './api/mongooseClient';
import routes from './api/routes';
import { namespaceRoutes } from './api/helpers';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3001,
    routes: {
      cors: true,
    },
  });

  server.route(namespaceRoutes('/api', routes));

  // Serve FE files
  await server.register(Inert);
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'client/public',
        index: ['index.html'],
        redirectToSlash: true,
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (!('isBoom' in response) || !response.isBoom) {
      return h.continue;
    }

    if (
      !request.path.startsWith('/api') &&
      response.output.statusCode === 404
    ) {
      return h.file('client/public/index.html');
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection');
  console.error(err);
  process.exit(1);
});

init();
