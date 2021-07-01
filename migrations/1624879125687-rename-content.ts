import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class renameContentGroupAndInitContent1624879587521
  implements MigrationInterface
{
  async dropForeignKeys(
    queryRunner: QueryRunner,
    tableName: string,
    columnNames: string[],
  ) {
    const table = await queryRunner.getTable(tableName);
    if (table !== undefined) {
      for (const foreignKey of table.foreignKeys) {
        for (const columnName of columnNames) {
          if (
            foreignKey.columnNames.includes(columnName) &&
            foreignKey.name !== undefined
          ) {
            await queryRunner.dropForeignKey(tableName, foreignKey.name);
          }
        }
      }
    }
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('contents', 'url');
    await queryRunner.renameTable('contents', 'content-groups');
    await queryRunner.renameTable(
      'playlist-to-contents',
      'playlist-to-content-groups',
    );
    await queryRunner.renameColumn(
      'playlist-to-content-groups',
      'contentId',
      'contentGroupId',
    );

    await queryRunner.createTable(
      new Table({
        name: 'contents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'url', type: 'text' },
          { name: 'key', type: 'varchar' },
          { name: 'contentGroupId', type: 'uuid' },
          { name: 'category', type: 'varchar' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'contents',
      new TableForeignKey({
        columnNames: ['contentGroupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'content-groups',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameTable(
      'playlist-to-content-group',
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

    await this.dropForeignKeys(queryRunner, 'contents', ['contentGroupId']);
    await queryRunner.dropTable('contents');
  }
}
