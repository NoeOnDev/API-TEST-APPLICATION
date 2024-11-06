export interface NotificationService {
  sendWhatsAppCode(phone: string, code: string): Promise<void>;
}