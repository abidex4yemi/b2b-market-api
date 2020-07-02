import mongoose from 'mongoose';

import config from '../config/dev';

const connectDB = (mongoUri, dbName) => {
  const mongooseOpts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: dbName,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected`);
  });
};

connectDB(config.mongoURI, config.dbName);
