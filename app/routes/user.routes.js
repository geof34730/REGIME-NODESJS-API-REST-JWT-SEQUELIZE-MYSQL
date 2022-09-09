import { loginStage1,loginStage2,register, passwordforget } from '../controllers/user.controller';
import { checkTokenMiddleware } from "../utils/jwt.js";



export const UserRouter = (app) => {
  app.post("/user/login/stage1", loginStage1);
  app.post("/user/login/stage2", loginStage2);
  app.post("/user/passwordforget", passwordforget);
  app.post("/user/register", register);
};
