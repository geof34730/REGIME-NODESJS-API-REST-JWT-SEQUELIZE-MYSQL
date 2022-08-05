import { UserController } from "../controllers/index.js";


export const UserRouter = (app) => {
  app.get("/api/users/login", UserController.login);
};
