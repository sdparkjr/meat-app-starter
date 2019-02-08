import { Request, Response } from "express";
import { User, users } from './users';

import * as jwt from 'jsonwebtoken';
import { apiConfig } from "./api-config";

export const minhaAutencacao = (req: Request, resp: Response) => {

    const user = req.body;

    if (isValid(user)) {

        const dbUser = users[user.email]
        //sub: que é o token,  iss quem vai emitir o token, meat-api-password seria um password da nossa aplicação
        const token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, apiConfig.secret)

        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token }) //o retorno ja vai com o token e nao compartilhando a senha com o client

    } else {

        resp.status(403).json({ message: 'Dados inválidos' })
    }

}


function isValid(user: User): boolean {

    if (!user) {
        return false;
    }

    const dbUser = users[user.email]

    return dbUser !== undefined && dbUser.matches(user);
}