import { NotificationService } from "../../domain/services/NotificationService";
import { twilioClient } from "../../../_config/twilio.config";
import { env } from "../../../_config/env.config";

export class TwilioNotificationService implements NotificationService {
  async sendWhatsAppCode(phone: string, code: string): Promise<void> {
    try {
      await twilioClient.messages.create({
        body: `Tu código de verificación es: ${code}`,
        from: `whatsapp:${env.twilio.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${phone}`,
      });
    } catch (error) {
      console.error("Error al enviar mensaje por WhatsApp:", error);
      throw new Error("Error al enviar el código de verificación");
    }
  }
}
