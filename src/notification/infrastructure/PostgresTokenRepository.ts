import { Pool } from "pg";
import { Token } from "../domain/Token";
import { TokenRepository } from "../domain/TokenRepository";

export class PostgresTokenRepository implements TokenRepository {
  constructor(private readonly pool: Pool) {}

  async save(token: Token): Promise<void> {
    const query = `
      INSERT INTO tokens (user_id, code, created_at, expires_at, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [
      token.userId,
      token.code,
      token.createdAt,
      token.expiresAt,
      token.status,
    ];
    const result = await this.pool.query(query, values);
    token.id = result.rows[0].id;
  }

  async findByCode(code: string): Promise<Token | null> {
    const query = `SELECT * FROM tokens WHERE code = $1`;
    const result = await this.pool.query(query, [code]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new Token(
      row.id,
      row.user_id,
      row.code,
      new Date(row.created_at),
      new Date(row.expires_at),
      row.status
    );
  }

  async updateStatus(id: string, status: "used" | "expired"): Promise<void> {
    const query = `UPDATE tokens SET status = $1 WHERE id = $2`;
    await this.pool.query(query, [status, id]);
  }
}
