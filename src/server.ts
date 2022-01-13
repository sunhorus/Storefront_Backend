import express from 'express';
import config from './services/config';
import { Loader } from './loaders';

const app = express();

async function startServer() {
  await new Loader().init({ app });
  app.listen(config.port, () => {
    console.log(`Application is working on port${config.port}`);
    app.emit('app-started');
    console.log("  Press CTRL-C to stop\n");
  });
}

startServer();

export { app };
