import bcrypt from "bcrypt";

export class UsersController {
    static login = (req, res) => {
        return res.status(202).send({
            // error: err.message || `Unable to find user with id ${data.id}`,
            error: "IDENTIFICATION EN COURS DE DEVELOPPEMENT",
            code: "UL1",
        });
    };

    static passwordCrypt(password) {
        return bcrypt.hashSync(password, 10);
    }
}
