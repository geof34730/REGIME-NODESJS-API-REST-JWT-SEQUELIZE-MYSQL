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

        lastname:{
            type: Sequelize.STRING,
            unique: false
        },
        firstname:{
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
            type: Sequelize.TEXT,
            unique: false
        },

        uuidfamillyadmin:{
            type: Sequelize.UUIDV4,
            unique: false
        },
        inscriptionvalide:{
            type: Sequelize.BOOLEAN,
            unique: false
        },
        codeForgetPassword:{
            type:Sequelize.INTEGER,
            primaryKey:false
        },
    },
    {
        freezeTableName: true,
        timestamps:true
    });
//console.log(User === sequelize.models.User);

User.prototype.toJsonReturnApi =  function (token) {
    var values = Object.assign({}, this.get());
    delete values.password;
    delete values.id;
    delete values.inscriptionvalide;
    delete values.createdAt;
    delete values.updatedAt;
    delete values.codeForgetPassword;
    values.token=token;
    //values.imageprofil=values.imageprofil.base64;

    console.log(values)
    return values;
}
export default User;