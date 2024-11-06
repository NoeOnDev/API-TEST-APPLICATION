import { Pool } from "pg";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (first_name, last_name, date_of_birth, phone, occupation, email, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    const values = [
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.phone,
      user.occupation,
      user.email,
      user.password,
    ];
    const result = await this.pool.query(query, values);
    if (!user.id) {
      user.id = result.rows[0].id;
    }
  }

  async findById(id: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new User(
      row.id,
      row.first_name,
      row.last_name,
      new Date(row.date_of_birth),
      row.phone,
      row.occupation,
      row.email,
      row.password
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await this.pool.query(query, [email]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new User(
      row.id,
      row.first_name,
      row.last_name,
      new Date(row.date_of_birth),
      row.phone,
      row.occupation,
      row.email,
      row.password
    );
  }

  async deleteById(id: string): Promise<void> {
    const query = `DELETE FROM users WHERE id = $1`;
    await this.pool.query(query, [id]);
  }
}
