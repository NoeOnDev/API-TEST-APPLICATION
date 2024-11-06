import * as jwt from "jsonwebtoken";
import { TokenService } from "../../domain/TokenService";
import { env } from "../../../_config/env.config";

export class JwtTokenService implements TokenService {
  generateToken(payload: object): string {
    return jwt.sign(payload, env.jwt.JWT_SECRET, {
      expiresIn: env.jwt.JWT_EXPIRATION,
    });
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, env.jwt.JWT_SECRET) as object;
    } catch (error) {
      return null;
    }
  }
}
