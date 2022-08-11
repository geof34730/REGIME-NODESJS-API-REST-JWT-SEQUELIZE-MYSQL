import Sequelize from 'sequelize';
import { sequelize } from '../utils/db.js'

const User = sequelize.define('user', {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },

        uuid:{
            type: Sequelize.UUIDV4,
            unique: true
        },

        pseudo:{
            type: Sequelize.STRING,
            unique: false
        },

        email:{
            type: Sequelize.STRING,
            unique: true
        },

        password:{
            type: Sequelize.STRING,
            unique: false
        },

        profil:{
            type: Sequelize.STRING,
            unique: false
        },

        datenaissance:{
            type: Sequelize.DATE,
            unique: false
        },

        sexe:{
            type: Sequelize.STRING,
            unique: false
        },

        taille:{
            type: Sequelize.DOUBLE,
            unique: false
        },

        imageprofil:{
            type: Sequelize.BLOB,
            unique: false
        },

        uuidfamillyadmin:{
            type: Sequelize.UUIDV4,
            unique: false
        },
    },
    {
        freezeTableName: true,
        timestamps:true
    });
console.log(User === sequelize.models.User);
export default User;