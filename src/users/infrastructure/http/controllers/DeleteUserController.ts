import { Request, Response } from "express";
import { DeleteUser } from "../../../application/DeleteUser";

export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUser) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteUser.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
