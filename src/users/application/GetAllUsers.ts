import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
