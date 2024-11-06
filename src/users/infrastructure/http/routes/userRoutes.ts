import { Router } from "express";
import {
  updateUserController,
  getAllUsersController,
  deleteUserController,
} from "../../dependencyInjection";

const userRoutes = Router();

userRoutes.get("/", getAllUsersController.handle.bind(getAllUsersController));
userRoutes.patch("/:id", updateUserController.handle.bind(updateUserController));
userRoutes.delete(
  "/:id",
  deleteUserController.handle.bind(deleteUserController)
);

export { userRoutes };
