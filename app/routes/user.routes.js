//import { UserController } from "../controllers/index.js";
import { loginStage1,loginStage2,register } from '../controllers/user.controller';

export const UserRouter = (app) => {
  app.post("/user/login/stage1", loginStage1);
  app.post("/user/login/stage2", loginStage2);
  app.post("/user/register", register);
};
