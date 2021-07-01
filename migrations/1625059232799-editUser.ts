import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class editUser1625059232799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password');
    await this.dropForeignKeys(queryRunner, 'events', ['userId']);
    await this.dropForeignKeys(queryRunner, 'playlists', ['userId']);
    await this.dropForeignKeys(queryRunner, 'screens', ['userId']);

    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isGenerated: false,
        isPrimary: true,
      }),
    );

    await queryRunner.changeColumn(
      'events',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
      }),
    );

    await queryRunner.changeColumn(
      'playlists',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
      }),
    );

    await queryRunner.changeColumn(
      'screens',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'events',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'playlists',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'screens',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'password',
        type: 'varchar',
      }),
    );

    await this.dropForeignKeys(queryRunner, 'events', ['userId']);
    await this.dropForeignKeys(queryRunner, 'playlists', ['userId']);
    await this.dropForeignKeys(queryRunner, 'screens', ['userId']);

    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );

    await queryRunner.changeColumn(
      'screens',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
      }),
    );

    await queryRunner.changeColumn(
      'playlists',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
      }),
    );

    await queryRunner.changeColumn(
      'events',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'events',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'playlists',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'screens',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
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
