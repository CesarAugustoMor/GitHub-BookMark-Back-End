import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import Favorite from '../infra/typeorm/entities/Favorite';

import IFavoriteRepository from '../repositories/IFavoriteRepository';

interface IRequest {
  user_id: string;
  nickname: string;
  avatar_github: string;
}

@injectable()
export default class CreateFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    nickname,
    avatar_github,
  }: IRequest): Promise<Favorite> {
    if (!(await this.userRepository.findById(user_id))) {
      throw new AppError('User not found.');
    }

    const favorite = this.favoriteRepository.create({
      user_id,
      nickname,
      avatar_github,
    });

    await this.cacheProvider.invalidatePrefix(`favorite-user:${user_id}`);

    return favorite;
  }
}
