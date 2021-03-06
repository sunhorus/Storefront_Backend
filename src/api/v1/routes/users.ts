import { Router, Request, Response } from 'express';
import UsersStoreAccess from '../../../helpers/usersAccess';
import { verifyAuthToken } from '../../../middlewares/AuthMiddleware';
import { User } from '../../../models/user';
import { signTokken } from '../../../services/auth/jwtAuth';

const route = Router();

export default (app: Router, UserStore: UsersStoreAccess) => {
  app.use('/users', route);

  route.post('/', async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password_digest: req.body.password,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
    };
    try {
      const newUser = await UserStore.create(user);
      const tokken = signTokken(newUser);
      res.status(201).json({ jwt: tokken });
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
      res.json({ jwt: tokken });
    } catch (err) {
      res.status(401);
      res.json(` authentication error: ${err} for user: ${user}`);
    }
  });

  route.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    const usertId = req.params.id;
    const data = await UserStore.show(usertId);
    return res.status(200).json(data);
  });
};
