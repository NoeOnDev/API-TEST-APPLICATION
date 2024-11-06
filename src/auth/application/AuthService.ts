import { UserRepository } from "../../users/domain/UserRepository";
import { User } from "../../users/domain/User";
import { HashingService } from "../domain/HashingService";
import { TokenService } from "../domain/TokenService";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService
  ) {}

  async register(userData: Omit<User, "id">): Promise<User> {
    const hashedPassword = await this.hashingService.hash(userData.password);
    const user = new User(
      null,
      userData.firstName,
      userData.lastName,
      userData.dateOfBirth,
      userData.phone,
      userData.occupation,
      userData.email,
      hashedPassword
    );
    await this.userRepository.save(user);
    return user;
  }

  async login(email: string, password: string): Promise<string | null> {
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
