import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class addUniqueScreenId1625127199495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'playlists',
      new TableUnique({
        name: 'UNIQUE_SCREEN',
        columnNames: ['screenId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('playlists', 'UNIQUE_SCREEN');
  }
}
