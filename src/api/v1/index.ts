import { Router } from 'express';
// import { InMemoryTimezonesStore } from '../../persistence/InMemeoryTimezonesStore';
// import timezones from './routes/timezones';
// import places from './routes/places';
// import PostgresPlacesStore from '../../persistence/PostgresPlacesStore';
import bodyParser from 'body-parser';
import ProductStoreAccess from '../../helpers/productsAccess';
import prodcuts from './routes/prodcuts';
import UsersStoreAccess from '../../helpers/usersAccess';
import users from './routes/users';

export default () => {
  const app = Router();
  // const inMemoryTimezonesStore = new InMemoryTimezonesStore();
  // const placesStore = new PostgresPlacesStore();
  const productStore = new ProductStoreAccess()
  const userStore = new UsersStoreAccess();
  app.use(bodyParser.json());
  prodcuts(app, productStore);
  users(app, userStore);

  // timezones(app, inMemoryTimezonesStore);
  // places(app, placesStore);
  return app;
};
