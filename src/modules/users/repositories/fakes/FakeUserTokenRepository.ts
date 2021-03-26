import { v4 as uuid } from 'uuid';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class FakeUsersTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(findToken => findToken.token === token);
  }
}
