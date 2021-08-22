import mongoose from 'mongoose';

mongoose.connect(
  `mongodb://${process.env.MONGODB_ADMIN_USERNAME}:${process.env.MONGODB_ADMIN_PASSWORD}@${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', () => {
  // we're connected!
  console.info('Connected to mongodb');
});

export { db };
