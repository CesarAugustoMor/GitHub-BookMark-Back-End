import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeFavoritesRepository from '../repositories/fakes/FakeFavoriteRepository';

import ListFavoritesService from './ListFavoritesService';

let fakeFavoritesRepository: FakeFavoritesRepository;
let fakeUsersRepository: FakeUsersRepository;
let listFavoritesService: ListFavoritesService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListFavorites', () => {
  beforeEach(() => {
    fakeFavoritesRepository = new FakeFavoritesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listFavoritesService = new ListFavoritesService(
      fakeFavoritesRepository,
      fakeCacheProvider,
    );
  });

  it('shuld be able to list favorites', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await fakeFavoritesRepository.create({
      user_id: user.id,
      nickname: 'JoeDoe123',
      avatar_github: 'http://hi.hi.hi/image.png',
    });

    await fakeFavoritesRepository.create({
      user_id: user.id,
      nickname: 'JohnTre456',
      avatar_github: 'http://hi.hi.hi/image1.png',
    });

    const favoriteList = await listFavoritesService.execute(user.id);

    expect(favoriteList).toHaveLength(2);
  });

  it('shuld be able to list favorites from cache', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await fakeFavoritesRepository.create({
      user_id: user.id,
      nickname: 'JoeDoe123',
      avatar_github: 'http://hi.hi.hi/image.png',
    });

    await fakeFavoritesRepository.create({
      user_id: user.id,
      nickname: 'JohnTre456',
      avatar_github: 'http://hi.hi.hi/image1.png',
    });

    await listFavoritesService.execute(user.id);

    const favoriteList = await listFavoritesService.execute(user.id);

    expect(favoriteList).toHaveLength(2);
  });

  it('shuld not be able to list the favorites from non-existing user', async () => {
    await expect(
      listFavoritesService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
