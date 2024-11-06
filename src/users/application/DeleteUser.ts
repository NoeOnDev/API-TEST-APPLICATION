import { UserRepository } from "../domain/UserRepository";

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
