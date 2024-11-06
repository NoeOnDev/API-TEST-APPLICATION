import { Request, Response } from "express";
import { UpdateUser } from "../../../application/UpdateUser";

export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.updateUser.execute(id, req.body);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
