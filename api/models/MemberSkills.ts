import { model, Schema, ObjectId } from 'mongoose';

interface MemberSkills {
  user: ObjectId;
  department: ObjectId;
  skills: { [key: string]: number };
}

const schema = new Schema<MemberSkills>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  skills: { type: Map, of: Number, required: true },
});

export default model<MemberSkills>('MemberSkills', schema);
