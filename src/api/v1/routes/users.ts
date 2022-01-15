import { Router, Request, Response } from 'express';
import UsersStoreAccess from '../../../helpers/usersAccess';
import { User } from '../../../models/user';
import { signTokken } from '../../../services/auth/jwtAuth';

const route = Router();

export default (app: Router, UserStore: UsersStoreAccess) => {
  app.use('/users', route);

  route.post('/', async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password_digest: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    try {
      const newUser = await UserStore.create(user);
      const tokken = signTokken(newUser);
      res.json(tokken);
    } catch (err) {
      res.status(400);
      res.json(`not able to create the user ${err}`);
    }
  });

  route.post('/authenticate', async (req: Request, res: Response) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    try {
      const u = await UserStore.authenticate(user.username, user.password);
      const tokken = signTokken(u as User);
      res.json(tokken);
    } catch (err) {
      res.status(401);
      res.json(` authentication error: ${err} for user: ${user}`);
    }
  });
};
