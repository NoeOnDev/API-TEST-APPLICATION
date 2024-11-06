import { NotificationService } from "../../domain/services/NotificationService";

export class TwilioNotificationService implements NotificationService {
  async sendWhatsAppCode(phone: string, code: string): Promise<void> {
    console.log(`Enviando código ${code} al número ${phone} via WhatsApp`);
  }
}
