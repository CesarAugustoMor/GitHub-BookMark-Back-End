import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userProfileRouter from '@modules/users/infra/http/routes/userProfile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import favoritesRouter from '@modules/favorites/infra/http/routes/favorites.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', userProfileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/favorites', favoritesRouter);

export default routes;
