import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IFavoriteRepository from '@modules/favorites/repositories/IFavoriteRepository';
import FavoritesRepository from '@modules/favorites/infra/typeorm/repositories/FavoritesRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IFavoriteRepository>(
  'FavoritesRepository',
  FavoritesRepository,
);
