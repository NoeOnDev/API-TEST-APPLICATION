import { Request, Response } from "express";
import { Login } from "../../../application/Login";

export class LoginController {
  constructor(private readonly login: Login) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.login.execute(email, password);
      if (!token) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
