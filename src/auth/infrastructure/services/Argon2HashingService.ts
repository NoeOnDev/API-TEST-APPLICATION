import * as argon2 from "argon2";
import { HashingService } from "../../domain/HashingService";

export class Argon2HashingService implements HashingService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verify(
    hashedPassword: string,
    plainPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, plainPassword);
  }
}
