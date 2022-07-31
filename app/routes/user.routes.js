import { UsersController } from "../controllers/index.js";


export const UserRouter = (app) => {
  app.get("/api/users/login", UsersController.login);
};
