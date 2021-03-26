import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTypeInFavorites1616798979026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'favorites',
      'avatar_github',
      new TableColumn({ name: 'avatar_github', type: 'varchar' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'favorites',
      'avatar_github',
      new TableColumn({ name: 'avatar_github', type: 'uuid' }),
    );
  }
}
