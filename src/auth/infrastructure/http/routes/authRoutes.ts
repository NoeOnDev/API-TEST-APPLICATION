import { Router } from "express";
import { registerController, loginController } from "../../dependencyInjection";

const authRoutes = Router();

authRoutes.post(
  "/register",
  registerController.handle.bind(registerController)
);
authRoutes.post("/login", loginController.handle.bind(loginController));

export { authRoutes };
