import {
  LoginStage1,
  LoginStage2,
  Register,
  SendCode,
  PasswordCodeReset,
  PasswordNew,
  ValidateInscription
} from '../controllers/user.controller';
import { checkTokenMiddleware } from "../utils/jwt.js";

export const UserRouter = (app) => {
  app.post("/user/login/stage1", LoginStage1);
  app.post("/user/login/stage2", LoginStage2);
  app.post("/user/sendcode", SendCode);
  app.post("/user/passwordcodereset", PasswordCodeReset);
  app.post("/user/passwordnew", PasswordNew);
  app.post("/user/register", Register);
  app.post("/user/validateinscription", ValidateInscription);
};
