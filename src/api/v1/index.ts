import { Router } from 'express';
// import { InMemoryTimezonesStore } from '../../persistence/InMemeoryTimezonesStore';
// import timezones from './routes/timezones';
// import places from './routes/places';
// import PostgresPlacesStore from '../../persistence/PostgresPlacesStore';
import bodyParser from 'body-parser';
import ProductStoreAccess from '../../helpers/productsAccess';
import prodcuts from './routes/prodcuts';

export default () => {
  const app = Router();
  // const inMemoryTimezonesStore = new InMemoryTimezonesStore();
  // const placesStore = new PostgresPlacesStore();
  const productStore = new ProductStoreAccess()
  app.use(bodyParser.json());
  prodcuts(app, productStore);

  // timezones(app, inMemoryTimezonesStore);
  // places(app, placesStore);
  return app;
};
