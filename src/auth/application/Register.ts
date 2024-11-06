import { UserRepository } from "../../users/domain/UserRepository";
import { User } from "../../users/domain/User";
import { HashingService } from "../domain/HashingService";

export class Register {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService
  ) {}

  async execute(userData: Omit<User, "id">): Promise<User> {
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
}
