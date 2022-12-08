import User from "../models/user.model.js";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export async function getUsers(req, res) {
    try {
        let data = await User.findAll({
        where: {
            profil: "familyAdmin"
        },
            attributes: [
                'uuid',
                'pseudo',
                'firstname',
                'lastname',
                'email',
                'profil',
                'datenaissance',
                'sexe',
                'taille',
                'uuidfamillyadmin'
           ]
        });
         return res.status(200).send(data);

    } catch (err) {
          return res.status(500).send({
                error: err,
                code: "UA1",
            });
    }
}