import http from 'http';
import app from './app';
import mongoose from 'mongoose';
import { mongo_uri, port } from './app/config/env.config';

const server = http.createServer(app);

const main = async () => {
  try {
    await mongoose.connect(mongo_uri as string);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    main();
  }
};

main();
