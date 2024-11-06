import { Token } from "./Token";

export interface TokenRepository {
  save(token: Token): Promise<void>;
  findByCode(code: string): Promise<Token | null>;
  updateStatus(id: string, status: "used" | "expired"): Promise<void>;
}
