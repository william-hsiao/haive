import Hapi from '@hapi/hapi';

import Department from '../models/Department';
import MemberSkills from '../models/MemberSkills';
import Team from '../models/Team';

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
  {
    method: 'GET',
    path: '/department/{id}/teams',
    handler: async (request) =>
      Team.find({ department: request.params.id })
        .select('name members skills')
        .populate({
          path: 'members',
          select: 'user skills',
          populate: { path: 'user', select: 'name' },
        })
        .exec(),
  },
  {
    method: 'POST',
    path: '/department/{id}/team',
    handler: async (request) => {
      // @ts-ignore
      const team = new Team(request.payload);
      console.log(team);
      console.log(team.validateSync());
      return {
        message: 'Succesfully created team',
        team,
      };
    },
  },
  {
    method: 'PATCH',
    path: '/department/{id}/team/{teamId}',
    handler: async (request) => {
      const team = await Team.findByIdAndUpdate(
        request.params.teamId,
        // @ts-ignore
        request.payload
      ).exec();
      console.log(team);
      return {
        message: 'Succesfully updated team',
        team,
      };
    },
  },
];

export default routes;
