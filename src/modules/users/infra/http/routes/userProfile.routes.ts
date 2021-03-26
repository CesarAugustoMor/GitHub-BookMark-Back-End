import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const usersProfileRouter = Router();
const usersProfileController = new UserProfileController();

usersProfileRouter.use(ensureAuthenticated);

usersProfileRouter.get('/', usersProfileController.show);
usersProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confiramtion: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersProfileController.update,
);

export default usersProfileRouter;
