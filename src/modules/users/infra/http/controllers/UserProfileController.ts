import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

export default class UsersProfileController {
  /**
   * show
   */
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user = await showUserProfile.execute({
      user_id,
    });

    return res.json(classToClass(user));
  }

  /**
   * update
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;

    const user_id = req.user.id;

    const createUser = container.resolve(UpdateUserProfileService);

    const user = await createUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return res.json(classToClass(user));
  }
}
