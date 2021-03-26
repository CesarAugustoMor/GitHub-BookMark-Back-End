import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('shuld be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const userProfile = await showUserProfile.execute({
      user_id: user.id,
    });
    expect(userProfile.name).toBe('John Doe');
    expect(userProfile.email).toBe('johndoe@exemple.com');
  });

  it('shuld not be able to show the profile from non-existing user', async () => {
    expect(
      showUserProfile.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
