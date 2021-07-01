import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class renameContent1624879587521 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('contents', 'url');
    await queryRunner.renameTable('contents', 'content-groups');
    await queryRunner.renameTable(
      'playlist-to-contents',
      'playlist-to-group-contents',
    );
    await queryRunner.renameColumn(
      'playlist-to-group-contents',
      'contentId',
      'contentGroupId',
    );
  }
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameTable(
      'playlist-to-group-contents',
      'playlist-to-contents',
    );
    await queryRunner.renameColumn(
      'playlist-to-contents',
      'contentGroupId',
      'contentId',
    );
    await queryRunner.renameTable('content-groups', 'contents');
    await queryRunner.addColumn(
      'contents',
      new TableColumn({ name: 'url', type: 'text' }),
    );
  }
}