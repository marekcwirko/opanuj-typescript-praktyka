import { DataAccess } from './DataAccess.ts';

export class Repository<T extends { id?: number }> {
  constructor(
    private dataAccess: DataAccess,
    private tableName: string,
  ) {}

  async getById(id: number): Promise<T | undefined> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const res = await this.dataAccess.query<T>(query, [id]);
    return res.rows[0];
  }

  async getAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const res = await this.dataAccess.query<T>(query);
    return res.rows;
  }

  async insert(data: Omit<T, 'id'>): Promise<T> {
    const columns = Object.keys(data) as (keyof Omit<T, 'id'>)[];
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const columnNames = columns.join(', ');
    const values = columns.map((col) => data[col]);

    const query = `INSERT INTO ${this.tableName} (${columnNames}) VALUES (${placeholders}) RETURNING *`;
    const res = await this.dataAccess.query<T>(query, values);
    return res.rows[0];
  }
}
