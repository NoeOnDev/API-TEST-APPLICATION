import { pool } from "../../_config/db.config";

import { PostgresUserRepository } from "../../users/infrastructure/PostgresUserRepository";

import { Register } from "../application/Register";
import { Login } from "../application/Login";

import { RegisterController } from "./http/controllers/RegisterController";
import { LoginController } from "./http/controllers/LoginController";

import { Argon2HashingService } from "./services/Argon2HashingService";
import { JwtTokenService } from "./services/JwtTokenService";

const userRepository = new PostgresUserRepository(pool);

const hashingService = new Argon2HashingService();
const tokenService = new JwtTokenService();

const register = new Register(userRepository, hashingService);
const login = new Login(userRepository, hashingService, tokenService);

const registerController = new RegisterController(register);
const loginController = new LoginController(login);

export { registerController, loginController };
