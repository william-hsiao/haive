import { model, Schema, ObjectId } from 'mongoose';

interface Department {
  name: string;
  skillSet: string[];
}

const schema = new Schema<Department>({
  name: { type: String, required: true },
  skillSet: [{ type: String, required: true }],
});

export default model<Department>('Department', schema);
