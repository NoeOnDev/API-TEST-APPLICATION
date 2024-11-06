import { pool } from "../../_config/db.config";

import { PostgresTokenRepository } from "./PostgresTokenRepository";

import { SendLoginVerification } from "../application/SendLoginVerification";

import { TwilioNotificationService } from "./services/TwilioNotificationService";

import { userRepository } from "../../users/infrastructure/dependencyInjection";

const tokenRepository = new PostgresTokenRepository(pool);

const notificationService = new TwilioNotificationService();

const sendLoginVerification = new SendLoginVerification(
  userRepository,
  tokenRepository,
  notificationService
);

export { sendLoginVerification };
