import { UserRepository } from "../../users/domain/UserRepository";
import { TokenService } from "../domain/TokenService";
import { HashingService } from "../domain/HashingService";

export class Login {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const validPassword = await this.hashingService.verify(
      user.password,
      password
    );
    if (!validPassword) {
      return null;
    }
    const token = this.tokenService.generateToken({ userId: user.id });
    return token;
  }
}
