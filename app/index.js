import dotenv  from "dotenv"
dotenv.config()
import "@babel/polyfill"
import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan';
import {
    UserRouter
} from "./routes/index.js";


const app = express();
const appPort = 8080;
var corsOptions = {
    origin: "http://localhost:61292/"
};
app.use(cors());
//app.use(fileupload());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("", function (req, res, next) {

    console.log('GO');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get("/", (request, repsonse) => {
    repsonse.json({
        message: "Welcome API Régime nodemon dev 2.0",
    });
});


UserRouter(app);

app.listen(appPort, () => {
    console.log(`Server listening at port ${appPort}`);
});
