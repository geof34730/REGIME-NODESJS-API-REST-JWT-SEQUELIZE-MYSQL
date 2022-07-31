import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../config/config.js";
/* Récupération du header bearer */
export const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
export const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = 'bearer '+req.headers.authorization && extractBearerToken('bearer '+req.headers.authorization)
    // Présence d'un token
    if (!token) {
        return res.status(403).json({
            error: 'Besoin d’un jeton',
            code: 'JC1'
        })
    }
    // Véracité du token
    jwt.verify(token, SECRET_KEY_JWT, (err, decodedToken) => {
        if (err) {
            res.status(401).json({
                error: 'Jeton défectueux',
                code: 'JC2'
            })
        } else {
            return next()
        }
    })
}