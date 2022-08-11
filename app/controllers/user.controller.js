import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid';
import User from "../models/user.model.js";
import Sequelize from 'sequelize';

const Op = Sequelize.Op;


export async function loginStage1(req, res) {
    try {
        let createdata = await User.findOne({where: {email: req.body.email}});
        return res.status(202).send({
            userRegister: createdata != null,
            code: "UL1",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: err,
            code: "UL2",
        });
    }
}

export async function loginStage2(req, res) {
    try {
        let createdata = await User.findOne({where: {email: req.body.email}});
        if (createdata) {
            return res.status(202).send({
                userRegister: true,
                code: "UL1",
            });
        } else {
            return res.status(202).send({
                userRegister: false,
                code: "UL1",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: "Something went wrong!",
            code: "UL1",
        });
    }
}

export async function register(req, res) {
    try {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        const uuidGenerate = uuidv4()
                        const userData = {
                            uuid: uuidGenerate,
                            pseudo: req.body.pseudo,
                            email: req.body.email,
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
                                return res.status(500).send({
                                    message: "votre inscription à bien été pris en compte, un email vient de vous ètre envoyé à l'adresse [EMAIL USER] pour que vous confirmiez votre inscription",
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