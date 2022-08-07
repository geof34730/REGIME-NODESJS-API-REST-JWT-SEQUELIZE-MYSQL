import Sequelize from 'sequelize';
import dotenv  from "dotenv"
dotenv.config()
export const sequelize = new Sequelize(
    process.env.DB_MYSQL,
    process.env.LOGIN_MYSQL,
    process.env.PASSWORD_MYSQL, {
        host: process.env.HOST_MYSQL,
        dialect: 'mysql',
        dialectOptions: {
            // Your mysql2 options here
        }
    })

sequelize.authenticate().then(() => {
    console.log('La connexion à la BDD a été établie avec succès.');
}).catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
});