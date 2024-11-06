import { Request, Response } from "express";
import { AuthService } from "../../application/AuthService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
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
