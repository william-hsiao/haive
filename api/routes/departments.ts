import Hapi from '@hapi/hapi';

import Department from '../models/Department';
import MemberSkills from '../models/MemberSkills';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/departments',
    handler: async () => Department.find({}).select('name').exec(),
  },
  {
    method: 'GET',
    path: '/department/{id}',
    handler: async (request) =>
      Department.findById(request.params.id).select('name skillSet').exec(),
  },
  {
    method: 'GET',
    path: '/department/{id}/members',
    handler: async (request) =>
      MemberSkills.find({ department: request.params.id })
        .select('user skills')
        .populate({ path: 'user', select: 'name' })
        .exec(),
  },
];

export default routes;
