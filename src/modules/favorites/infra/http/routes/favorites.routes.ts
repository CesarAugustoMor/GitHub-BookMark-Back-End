import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FavoritesController from '../controllers/FavoritesController';

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.get('/', favoritesController.index);

favoritesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nickname: Joi.string().required(),
      avatar_github: Joi.string().required(),
    },
  }),
  favoritesController.create,
);

favoritesRouter.delete('/:id', favoritesController.deleted);

export default favoritesRouter;
