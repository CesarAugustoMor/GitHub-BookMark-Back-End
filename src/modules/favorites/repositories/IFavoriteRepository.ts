import ICreateFavoriteDTO from '../dtos/ICreateFavoriteDTO';
import Favorite from '../infra/typeorm/entities/Favorite';

export default interface IFavoritesRepository {
  findById(id: string): Promise<Favorite | undefined>;
  findByNickname(nickname: string): Promise<Favorite | undefined>;
  findAllByUser(user_id: String): Promise<Favorite[] | undefined>;
  create(data: ICreateFavoriteDTO): Promise<Favorite>;
  save(favorite: Favorite): Promise<Favorite>;
  delete(favorite_id: string): Promise<number | null | undefined>;
}
