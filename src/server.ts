require('dotenv').config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { createApp } from './app';
const port = process.env.PORT || 3000;

createConnection().then(async connection => {

  const app = createApp(connection);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });

}).catch(error => console.error(error));

