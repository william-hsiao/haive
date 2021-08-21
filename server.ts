import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

import routes from './api/index';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3001,
    routes: {
      cors: true,
    },
  });

  server.route(routes);

  // Serve FE files
  await server.register(Inert);
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'client/public',
        index: ['index.html'],
      },
    },
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
