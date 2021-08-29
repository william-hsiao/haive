import { model, Schema, ObjectId } from 'mongoose';

interface Team {
  name: string;
  department: ObjectId;
  members: ObjectId[];
  skills: string[];
}

const schema = new Schema<Team>({
  name: { type: String, required: true },
  members: [
    { type: Schema.Types.ObjectId, ref: 'MemberSkills', required: true },
  ],
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  skills: [{ type: String, required: true }],
});

export default model<Team>('Team', schema);
