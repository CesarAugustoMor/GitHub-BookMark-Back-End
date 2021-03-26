import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('shuld be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@exemple.com',
    });
    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@exemple.com');
  });

  it('shuld not be able to change to anther user e-mail', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@exemple.com',
      password: '12345678',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shuld be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@exemple.com',
      old_password: '12345678',
      password: '12341234',
    });
    expect(updatedUser.password).toBe('12341234');
  });

  it('shuld not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@exemple.com',
        password: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shuld not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@exemple.com',
        old_password: 'wrong-old-password',
        password: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shuld not be able to update the profile of a non existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'non-existing-user',
        name: 'John Trê',
        email: 'johntre@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
