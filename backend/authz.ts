import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import { apiConfig } from "./api-config";

export const minhaAutorizacao = (req: Request, resp: Response, next) => {

    const token = extraIrToken(req);

    if (!token) {
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        resp.status(401).json({ message: 'você precisa se autenticar' });
    } else {
        //vamos verificar o token lembrando de passar o password da aplicação
        jwt.verify(token, apiConfig.secret, (error, decoded) => {
            if (decoded) {
                next() //tudo certo pode deixa passar
            } else {
                resp.status(403).json({ message: 'Não autorizado' });
            }

        })


    }

}


function extraIrToken(req: Request): string {
    let token = undefined

    if (req.header && req.headers.authorization) {
        //Authorization: Bearer XXX.XXX.XXX
        console.log(req.headers.authorization)
        const parts: string[] = req.headers.authorization.split(' ') //dividir pelo espaçõ

        if (parts.length == 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }

    return token
}