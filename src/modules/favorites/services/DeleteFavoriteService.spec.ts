import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

import FakeFavoriteRepository from '../repositories/fakes/FakeFavoriteRepository';
import DeleteFavoriteService from './DeleteFavoriteService';

let fakeFavoriteRepository: FakeFavoriteRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteDeleteFavoriteService: DeleteFavoriteService;

describe('DeleteFavorite', () => {
  beforeEach(() => {
    fakeFavoriteRepository = new FakeFavoriteRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteDeleteFavoriteService = new DeleteFavoriteService(
      fakeFavoriteRepository,
      fakeCacheProvider,
    );
  });

  it('shuld not be able to delete a favorite with a non-existent id', async () => {
    await expect(
      deleteDeleteFavoriteService.execute({
        user_id: 'an-id',
        favorite_id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shuld be able to delete a new post image', async () => {
    const favorite = await fakeFavoriteRepository.create({
      user_id: 'an-id',
      nickname: 'JoeDoe1',
      avatar_github: 'http://hi.hi.hi/image.png',
    });

    const deletedPostImage = await deleteDeleteFavoriteService.execute({
      favorite_id: favorite.id,
      user_id: favorite.user_id,
    });

    expect(deletedPostImage).toBe(1);
  });
});
