import { User } from "./User";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  deleteById(id: string): Promise<void>;
}
