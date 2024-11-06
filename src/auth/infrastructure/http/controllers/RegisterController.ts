import { Request, Response } from "express";
import { Register } from "../../../application/Register";

export class RegisterController {
  constructor(private readonly register: Register) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.register.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
