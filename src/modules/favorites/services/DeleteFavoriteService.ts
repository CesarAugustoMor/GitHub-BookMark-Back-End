import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

import IFavoriteRepository from '../repositories/IFavoriteRepository';

interface IRequest {
  favorite_id: string;
  user_id: string;
}

@injectable()
export default class DeleteFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ favorite_id, user_id }: IRequest): Promise<number> {
    const favorite = await this.favoriteRepository.findById(favorite_id);

    const deletedFavorite = await this.favoriteRepository.delete(favorite_id);

    if (!deletedFavorite || !favorite) {
      throw new AppError('Error when deleting favorite.');
    }

    await this.cacheProvider.invalidatePrefix(`favorite-user:${user_id}`);

    return deletedFavorite;
  }
}
