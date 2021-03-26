import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';
import { getRepository, Repository } from 'typeorm';
import IFavoritesRepository from '../../../repositories/IFavoriteRepository';
import Favorite from '../entities/Favorite';

export default class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Repository<Favorite>;

  constructor() {
    this.ormRepository = getRepository(Favorite);
  }

  public async findById(id: string): Promise<Favorite | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByNickname(nickname: string): Promise<Favorite | undefined> {
    return this.ormRepository.findOne({ where: { nickname } });
  }

  public async findAllByUser(user_id: String): Promise<Favorite[] | undefined> {
    return this.ormRepository.find({
      where: { user_id },
      order: { nickname: 'ASC' },
    });
  }

  public async create(data: ICreateFavoriteDTO): Promise<Favorite> {
    const favorite = this.ormRepository.create(data);

    await this.ormRepository.save(favorite);

    return favorite;
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    return this.ormRepository.save(favorite);
  }

  public async delete(favorite_id: string): Promise<number | null | undefined> {
    const result = await this.ormRepository.delete(favorite_id);

    return result.affected;
  }
}
