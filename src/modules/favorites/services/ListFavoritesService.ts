import { classToClass } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Favorite from '../infra/typeorm/entities/Favorite';

import IFavoritesRepository from '../repositories/IFavoriteRepository';

@injectable()
export default class ListFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: String): Promise<Favorite[]> {
    const cacheKey = `favorite-user:${user_id}`;

    let favorites =
      (await this.cacheProvider.recovery<Favorite[]>(cacheKey)) || undefined;

    if (!favorites) {
      favorites = await this.favoritesRepository.findAllByUser(user_id);

      if (!favorites) {
        throw new AppError('Favorites not found.', 404);
      }

      await this.cacheProvider.save(cacheKey, classToClass(favorites));
    }

    return favorites;
  }
}
