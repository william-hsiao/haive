import { model, Schema, ObjectId } from 'mongoose';

interface Department {
  name: string;
  skillSet: string[];
  memberSkills: ObjectId[];
}

const schema = new Schema<Department>({
  name: { type: String, required: true },
  skillSet: [{ type: String, required: true }],
  memberSkills: [{ type: Schema.Types.ObjectId, ref: 'MemberSkills' }],
});

export default model<Department>('Department', schema);
