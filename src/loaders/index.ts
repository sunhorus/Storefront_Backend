import { Application } from 'express';
import expressLoader from './providers/express';
import migrator from './providers/migrator';

export class Loader {
  async init({ app }: { app: Application }) {
    await migrator();
    await expressLoader({ app });
  }
}
