import Sequelize from 'sequelize';
import { sequelize } from '../utils/db.js'

const User = sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },

    email:{
        type: Sequelize.STRING,
        unique: true
    },

},
    {
        freezeTableName: true,
        timestamps:false
    });
console.log(User === sequelize.models.User);
export default User;