import { v4 as uuid } from 'uuid';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoriteRepository';
import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';
import Favorite from '@modules/favorites/infra/typeorm/entities/Favorite';

export default class FakeFavoriteRopository implements IFavoritesRepository {
  private favorites: Favorite[] = [];

  public async findById(id: string): Promise<Favorite | undefined> {
    return this.favorites.find(favorite => favorite.id === id);
  }

  public async findByNickname(nickname: string): Promise<Favorite | undefined> {
    return this.favorites.find(favorite => favorite.nickname === nickname);
  }

  public async findAllByUser(user_id: String): Promise<Favorite[] | undefined> {
    const favorites = this.favorites.filter(
      favorite => favorite.user_id === user_id,
    );

    if (favorites.length === 0) {
      return undefined;
    }
    return favorites;
  }

  public async create(data: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = new Favorite();

    Object.assign(favorite, { id: uuid() }, data);

    this.favorites.push(favorite);

    return favorite;
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    const findIndex = this.favorites.findIndex(
      findFavorite => findFavorite.id === favorite.id,
    );

    this.favorites[findIndex] = favorite;

    return favorite;
  }

  public async delete(favorite_id: string): Promise<number | null | undefined> {
    const findIndex = this.favorites.findIndex(
      findFavorite => findFavorite.id === favorite_id,
    );

    const favoritesLength = this.favorites.length;

    if (findIndex < 0) {
      return undefined;
    }

    this.favorites.splice(findIndex, 1);

    if (favoritesLength === this.favorites.length) {
      return null;
    }

    return 1;
  }
}
