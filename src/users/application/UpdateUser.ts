import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    userData: Partial<Omit<User, "id">>
  ): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    const updatedUser = new User(
      user.id,
      userData.firstName ?? user.firstName,
      userData.lastName ?? user.lastName,
      userData.dateOfBirth ?? user.dateOfBirth,
      userData.phone ?? user.phone,
      userData.occupation ?? user.occupation,
      userData.email ?? user.email,
      user.password
    );

    await this.userRepository.save(updatedUser);
    return updatedUser;
  }
}
