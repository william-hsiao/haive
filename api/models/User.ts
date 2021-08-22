import { model, Schema } from 'mongoose';

interface User {
  name: string;
  email: string;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default model<User>('User', schema);
