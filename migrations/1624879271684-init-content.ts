import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class initFile1624879271684 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
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

  async down(queryRunner: QueryRunner): Promise<void> {
    await this.dropForeignKeys(queryRunner, 'contents', ['contentGroupId']);

    await queryRunner.dropTable('contents');
  }

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
}