import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEMailService from '@modules/users/services/SendForgotPasswordEMailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEMailService: SendForgotPasswordEMailService;

describe('SendForgotPasswordEMail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    sendForgotPasswordEMailService = new SendForgotPasswordEMailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('shuld be able to recover the password using the e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await sendForgotPasswordEMailService.execute({
      email: 'johndoe@exemple.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('shuld not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEMailService.execute({
        email: 'johndoe@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shuld generate a forgot passoword token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345678',
    });

    await sendForgotPasswordEMailService.execute({
      email: 'johndoe@exemple.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
