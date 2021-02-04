import { Router } from 'express';
import UserController from './components/users/controller';

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

export default routes;
