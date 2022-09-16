import {
  LoginStage1,
  LoginStage2,
  Register,
  PasswordForget,
  PasswordCodeReset,
  PasswordNew
} from '../controllers/user.controller';
import { checkTokenMiddleware } from "../utils/jwt.js";

export const UserRouter = (app) => {
  app.post("/user/login/stage1", LoginStage1);
  app.post("/user/login/stage2", LoginStage2);
  app.post("/user/passwordforget", PasswordForget);
  app.post("/user/passwordcodereset", PasswordCodeReset);
  app.post("/user/passwordnew", PasswordNew);

  app.post("/user/register", Register);
};
