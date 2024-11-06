import { Request, Response } from "express";
import { GetAllUsers } from "../../../application/GetAllUsers";

export class GetAllUsersController {
  constructor(private readonly getAllUsers: GetAllUsers) {}

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsers.execute();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
