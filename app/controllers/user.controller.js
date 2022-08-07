import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;



export async function loginStage1(req, res) {
    try{
        let createdata = await User.findOne({where:{email:req.body.email}});
            return res.status(202).send({
                userRegister:createdata!=null,
                code: "UL1",
            });

    }catch(err){
        console.log(err);
        return res.status(500).send({
            error:err,
            code: "UL2",
        });
    }
}

export async function loginStage2(req, res) {
    try{
        let createdata = await User.findOne({where:{email:req.body.email}});
        if(createdata){
            return res.status(202).send({
                userRegister:true,
                code: "UL1",
            });
        }
        else{
            return res.status(202).send({
                userRegister:false,
                code: "UL1",
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({
            error:"Something went wrong!",
            code: "UL1",
        });
    }
}

