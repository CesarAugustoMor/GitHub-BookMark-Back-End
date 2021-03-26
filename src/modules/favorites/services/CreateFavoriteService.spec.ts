import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeFavoriteRepository from '../repositories/fakes/FakeFavoriteRepository';
import CreateFavoriteService from './CreateFavoriteService';

let fakeUsersRepository: FakeUsersRepository;
let fakeFavoriteRepository: FakeFavoriteRepository;
let fakeCacheProvider: FakeCacheProvider;
let createFavoriteService: CreateFavoriteService;

describe('CreateFavorite', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFavoriteRepository = new FakeFavoriteRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createFavoriteService = new CreateFavoriteService(
      fakeFavoriteRepository,
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('shuld not be able to create a Favorite with a non-existent user ', async () => {
    await expect(
      createFavoriteService.execute({
        user_id: 'non-existent-user',
        nickname: 'JJohnDoe123',
        avatar_github: 'http://hi.hi.hi/image.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shuld be able to create a new favorite', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const favorite = await createFavoriteService.execute({
      user_id: user.id,
      nickname: 'JohnTre123',
      avatar_github: 'http://hi.hi.hi/image.png',
    });

    expect(favorite).toHaveProperty('id');
  });
});
