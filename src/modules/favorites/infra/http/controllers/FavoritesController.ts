import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFavoriteService from '../../../services/CreateFavoriteService';
import DeleteFavoriteService from '../../../services/DeleteFavoriteService';
import ListFavoritesService from '../../../services/ListFavoritesService';

export default class FavoritesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listFavorites = container.resolve(ListFavoritesService);

    const favorite = await listFavorites.execute(req.user.id);

    return res.json(classToClass(favorite));
  }

  /**
   * create
   */
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { nickname, avatar_github } = req.body;

    const createFavorite = container.resolve(CreateFavoriteService);

    const favorite = await createFavorite.execute({
      user_id,
      nickname,
      avatar_github,
    });

    return res.json(classToClass(favorite));
  }

  /**
   * deleted
   */
  public async deleted(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id: favorite_id } = req.params;
    const deletedFavorite = container.resolve(DeleteFavoriteService);

    const favorite = await deletedFavorite.execute({
      favorite_id,
      user_id,
    });

    return res.status(204).send();
  }
}
