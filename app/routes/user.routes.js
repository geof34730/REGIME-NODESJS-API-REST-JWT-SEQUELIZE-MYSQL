import {
    LoginStage1,
    LoginStage2,
    Register,
    SendCode,
    PasswordCodeReset,
    PasswordNew,
    ValidateInscription,
    getUsersFamily,
    AddUserFamily,
    UpdateUserFamily,
    DeleteUserFamily

} from '../controllers/user.controller';

import {
    getUsers
} from '../controllers/admin.user.controller';

import { checkTokenMiddleware } from "../utils/jwt.js";

export const UserRouter = (app) => {
  app.post("/user/login/stage1", LoginStage1);
  app.post("/user/login/stage2", LoginStage2);
  app.post("/user/sendcode", SendCode);
  app.post("/user/passwordcodereset", PasswordCodeReset);
  app.post("/user/passwordnew", PasswordNew);
  app.post("/user/register", Register);
  app.post("/user/validateinscription", ValidateInscription);
  app.post("/user/usersfamily",checkTokenMiddleware, getUsersFamily);
  app.post("/user/userteamadd",checkTokenMiddleware, AddUserFamily);
  app.post("/user/userteamupdate",checkTokenMiddleware, UpdateUserFamily);
  app.post("/user/userteamdelete",checkTokenMiddleware, DeleteUserFamily);


  ///ADMIN
     app.post("/admin/user/all",getUsers);
};
