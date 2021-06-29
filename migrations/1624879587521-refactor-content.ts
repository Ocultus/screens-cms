import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class refactorContent1624879587521 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('contents', 'url');
  }
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'content',
      new TableColumn({ name: 'url', type: 'text' }),
    );
  }
}
