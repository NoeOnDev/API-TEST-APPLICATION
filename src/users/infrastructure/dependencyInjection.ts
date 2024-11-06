import { pool } from "../../_config/db.config";

import { PostgresUserRepository } from "./PostgresUserRepository";

import { UpdateUser } from "../application/UpdateUser";
import { GetAllUsers } from "../application/GetAllUsers";
import { DeleteUser } from "../application/DeleteUser";

import { UpdateUserController } from "./http/controllers/UpdateUserController";
import { GetAllUsersController } from "./http/controllers/GetAllUsersController";
import { DeleteUserController } from "./http/controllers/DeleteUserController";

const userRepository = new PostgresUserRepository(pool);

const updateUser = new UpdateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const deleteUser = new DeleteUser(userRepository);

const updateUserController = new UpdateUserController(updateUser);
const getAllUsersController = new GetAllUsersController(getAllUsers);
const deleteUserController = new DeleteUserController(deleteUser);

export { updateUserController, getAllUsersController, deleteUserController };
