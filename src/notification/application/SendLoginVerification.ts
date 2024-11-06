import { UserRepository } from "../../users/domain/UserRepository";
import { TokenRepository } from "../domain/TokenRepository";
import { NotificationService } from "../domain/services/NotificationService";
import { Token } from "../domain/Token";

export class SendLoginVerification {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly notificationService: NotificationService
  ) {}

  generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const code = this.generateCode();

    const token = new Token(
      null,
      userId,
      code,
      new Date(),
      new Date(Date.now() + 15 * 60 * 1000),
      "active"
    );

    await this.tokenRepository.save(token);
    await this.notificationService.sendWhatsAppCode(user.phone, code);
  }
}
