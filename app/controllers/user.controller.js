import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid';
import User from "../models/user.model.js";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_EMAIL_SENDER,
    auth: {
        user: process.env.LOGIN_EMAIL_SENDER,
        pass: process.env.PASSWORD_EMAIL_SENDER
    }
});

export async function Register(req, res) {
    try {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) {
                    console.log(req.body);
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        const uuidGenerate = uuidv4()
                        const userData = {
                            uuid: uuidGenerate,
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: hash,
                            profil: "familyAdmin",
                            datenaissance: req.body.datenaissance,
                            sexe: req.body.sexe,
                            taille: req.body.taille,
                            uuidfamillyadmin: uuidGenerate,
                            imageprofil:req.body.imageprofil,
                        }
                        User.create(userData)
                            .then(user => {
                                return res.status(200).send({
                                    message: "Votre inscription à bien été pris en compte, vous pouvez dès à présent vous idientifier.",
                                    code: 'UR1'
                                });
                            })
                            .catch(err => {
                                return res.status(500).send({
                                    error: err,
                                    code: "UR2",
                                });
                            })
                    })
                } else {
                    return res.status(403).send({
                        error: "Vous êtes déjà inscrit, merci de vous identifier avec votre email et votre mot de passe.",
                        code: "UR3",
                    });
                }
            })
            .catch(err => {
                return res.status(500).send({
                    error: err,
                    code: "UR4",
                });
            })


    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            code: "UR5",
        });
    }
}

export async function AddUserFamily(req, res) {
    try {
        const uuidGenerate = uuidv4()
        const userData = {
            uuid: uuidGenerate,
            pseudo: req.body.pseudo,
            email: null,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profil: "familyUser",
            datenaissance: req.body.datenaissance,
            sexe: req.body.sexe,
            taille: req.body.taille,
            uuidfamillyadmin: req.body.uuidfamillyadmin,
            imageprofil: req.body.imageprofil
        }
        User.create(userData)
            .then(async user => {
            console.log(req.headers.authorization);
            let data = await User.findOne({where: {uuid: req.body.uuidfamillyadmin}});
            let dataUser = data.toJsonReturnApi(req.headers.authorization);
            dataUser["usersFamily"]=await getUsersFamily(req.body.uuidfamillyadmin)
                return res.status(200).send({
                    message: ("Utilisateur ajouté à votre Team"),
                    code: 'UA1',
                    user: dataUser
                });
        })
        .catch(err => {
            return res.status(500).send({
                error: err,
                code: "UA2",
            });
        })
    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UA3",
        });
    }
}

export async function UpdateUserFamily(req, res) {
    try {
       const userData = {
            pseudo: req.body.pseudo,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            datenaissance: req.body.datenaissance,
            sexe: req.body.sexe,
            taille: req.body.taille,
            imageprofil: req.body.imageprofil
        }
         User.update(userData, {where: {uuid: req.body.uuid},})
             .then(async user => {
                let data = await User.findOne({where: {uuid: req.body.uuidfamillyadmin}});
                let dataUser = data.toJsonReturnApi(req.headers.authorization);
                dataUser["usersFamily"]=await getUsersFamily(req.body.uuidfamillyadmin)
                return res.status(200).send({
                    message: "Utilisateur mise à jour",
                    code: 'UU1',
                    user: dataUser
                });
            })
            .catch(err => {
                    return res.status(500).send({
                        error: err,
                        code: "UU2",
                    });
                })

    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UU3",
        });
    }
}

export async function DeleteUserFamily(req, res) {
    try {
        User.destroy({
              where: { uuid: req.body.uuid },
            }).then(async user => {
                let data = await User.findOne({where: {uuid: req.body.uuidfamillyadmin}});
                let dataUser = data.toJsonReturnApi(req.headers.authorization);
                dataUser["usersFamily"] = await getUsersFamily(req.body.uuidfamillyadmin)
                return res.status(200).send({
                    message: "utilisateur supprimé",
                    code: "UD1",
                    user: dataUser
                });
            }
        );
    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UU3",
        });
    }
}

export async function ValidateInscription(req, res) {
    try {
        let selectdata = await User.findOne({where: {email: req.body.email}});
        let dateExpirationCode=selectdata.updatedAt.setMinutes(selectdata.updatedAt.getMinutes() +  parseInt(process.env.TIMER_RESET_PASSWORD_MINUTES)); // timestamp
        dateExpirationCode = new Date(dateExpirationCode);
        let dateSend = new Date();
        if(dateExpirationCode<dateSend){
            return res.status(401).send({
                error: "Code Expiré",
                code: "UPCR1",
            });
        }
        else {
            if (selectdata.codeForgetPassword != req.body.code) {
                return res.status(401).send({
                    error: "Code non valide",
                    code: "UPCR2",
                });
            } else {
                console.log('change statut inscription')

                 User.update({inscriptionvalide: 1}, {where: {email: req.body.email},});

                return res.status(202).send({
                    email: selectdata.email,
                    timeCodeValidate: dateExpirationCode.getTime(),
                    codereset: selectdata.codeForgetPassword,
                    code: "UPCR3",
                });
            }
        }

    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UPCR4",
        });
    }
}

export async function LoginStage1(req, res) {
    try {
        let createdata = await User.findOne({where: {email: req.body.email}});
        return res.status(202).send({
            userRegister: createdata != null,
            code: "UL1",
        });

    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UL2",
        });
    }
}

export async function LoginStage2(req, res) {
    try {
        let data = await User.findOne({where: {email: req.body.email}});
        if (data != null) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                //identifié
                if (data.inscriptionvalide==1) {
                    //compte activé
                    const token = jwt.sign({ uuid: data.uuid,profil: data.profil }, process.env.SECRET_KEY_JWT, {
                        expiresIn: "3 hours",
                    });
                   let dataUser = await data.toJsonReturnApi(token);
                   dataUser["usersFamily"]=await getUsersFamily(dataUser.uuidfamillyadmin)
                    return  res.status(200).send({
                        code: "ULP1",
                        user: dataUser
                    });
                } else {
                    //compte non actif
                    return res.status(401).send({
                        error: "Votre compte n'est pas activé",
                        code: "ULP2",
                    });
                }
            } else {
                return res.status(401).send({
                    error: "Login et/ou mot de passe invalide",
                    code: "ULP3",
                });
            }
        } else {
            return res.status(401).send({
                error: "Login et/ou mot de passe invalide",
                code: "ULP4",
            });
        }

    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "ULP5",
        });
    }
}

export async function SendCode(req, res) {
    let mailOptions = {};
    try {
        let codeGenerate=Math.floor(100000 + Math.random() * 900000);
        await User.update({codeForgetPassword: codeGenerate,},{where: { email: req.body.email },});
        let selectdata = await User.findOne({where: {email: req.body.email}});
        let dateExpirationCode=selectdata.updatedAt.setMinutes(selectdata.updatedAt.getMinutes() + parseInt(process.env.TIMER_RESET_PASSWORD_MINUTES)); // timestamp
        dateExpirationCode = new Date(dateExpirationCode); // Date object

        if(req.body.mail=="valideInscription") {
             mailOptions = {
                from: process.env.EMAIL_SENDER,
                to: selectdata.email,
                subject: "TeamWeight - Votre code de validation d'inscription",
                text: 'Saisissez le code ' + codeGenerate + ' pour valider votre inscription.',
                html: 'Saisissez le code <b>' + codeGenerate + '</b> pour valider votre inscription.',
            };
        }
            else{
                mailOptions = {
                from: process.env.EMAIL_SENDER,
                to: selectdata.email,
                subject: 'TeamWeight - Votre code de réinitialisation de mot de passe',
                text: 'Saisissez le code ' + codeGenerate + ' pour réinitialiser votre mot de passe.',
                html: 'Saisissez le code <b>' + codeGenerate + '</b> pour réinitialiser votre mot de passe.',
            };
        }
        if(process.env.SEND_MAIL=="true") {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.status(500).send({
                        error: error,
                        code: "UPF1",
                    });
                } else {
                   return res.status(202).send({
                        email: selectdata.email,
                        timeCodeValidate: dateExpirationCode.getTime(),
                        code: "UPF2",
                    });
                }
            });
        }
        else {
            return res.status(202).send({
                email: selectdata.email,
                timeCodeValidate: dateExpirationCode.getTime(),
                code: "UPF2",
            });
        }
    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UPF3",
        });
    }
}

export async function PasswordCodeReset(req, res) {
    try {
        let selectdata = await User.findOne({where: {email: req.body.email}});
        let dateExpirationCode=selectdata.updatedAt.setMinutes(selectdata.updatedAt.getMinutes() +  parseInt(process.env.TIMER_RESET_PASSWORD_MINUTES)); // timestamp
        dateExpirationCode = new Date(dateExpirationCode);
        let dateSend = new Date();
        if(dateExpirationCode<dateSend){
            return res.status(401).send({
                error: "Code Expiré",
                code: "UPCR1",
            });
        }
        else {
            if (selectdata.codeForgetPassword != req.body.code) {
                return res.status(401).send({
                    error: "Code non valide",
                    code: "UPCR2",
                });
            } else {
                return res.status(202).send({
                    email: selectdata.email,
                    timeCodeValidate: dateExpirationCode.getTime(),
                    codereset: selectdata.codeForgetPassword,
                    code: "UPCR3",
                });
            }
        }

    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UPCR4",
        });
    }
}

export async function PasswordNew(req, res) {
    try {
        let selectdata = await User.findOne({where: {email: req.body.email}});
        let dateExpirationCode=selectdata.updatedAt.setMinutes(selectdata.updatedAt.getMinutes() +  parseInt(process.env.TIMER_RESET_PASSWORD_MINUTES)); // timestamp
        dateExpirationCode = new Date(dateExpirationCode);
        let dateSend = new Date();

        if(dateExpirationCode<dateSend){
            return res.status(401).send({
                error: "Code Expiré",
                code: "UPCN1",
            });
        }
        else{
            if (selectdata.codeForgetPassword!=req.body.code) {
                return res.status(401).send({
                    error: "Code non valide",
                    code: "UPCN2",
                });
            }
            else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    User.update({password: hash}, {where: {email: req.body.email},});
                    return res.status(200).send({
                        message: "Votre mot de passe à bien été modifié",
                        code: "UPCN3",
                    });
                });
            }
        }

    } catch (err) {
        return res.status(500).send({
            error: err,
            code: "UPN4",
        });
    }
}

export async function getUsersFamily(uuidfamillyadmin) {
    try {
        let data = await User.findAll({
        where: {
            uuidfamillyadmin: uuidfamillyadmin
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
                'imageprofil',
                'uuidfamillyadmin'
           ]
        });
        return  data;
    } catch (err) {
      return err;
    }
}


