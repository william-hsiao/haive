import mongoose from 'mongoose';
import faker from 'faker';

import { db } from '../api/mongooseClient';
import User from '../api/models/User';
import Department from '../api/models/Department';
import MemberSkills from '../api/models/MemberSkills';

faker.seed(255);

export const generate = async () => {
  if ((await Department.countDocuments()) > 0) {
    console.info('Skipping seed generation');
    db.close();
    return;
  }

  const users = Array.from({ length: 30 }, () => ({
    _id: new mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  }));
  await User.insertMany(users);

  const department = new Department({
    _id: new mongoose.Types.ObjectId(),
    name: faker.lorem.word(),
    skillSet: Array.from({ length: 10 }, () => faker.random.word()),
    memberSkills: [],
  });
  await department.save((err) => {
    if (err) {
      console.error('Failed to generate department', err);
      return;
    }
  });

  const memberSkills = users.map((user) => {
    const skills = {};
    department.skillSet.forEach((skill) => {
      skills[skill] = faker.datatype.number({ min: 0, max: 5 });
    });
    return {
      user: user._id,
      department: department._id,
      skills,
    };
  });
  await MemberSkills.insertMany(memberSkills);

  db.close();
};

generate();
