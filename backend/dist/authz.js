"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
exports.minhaAutorizacao = function (req, resp, next) {
    var token = extraIrToken(req);
    if (!token) {
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        resp.status(401).json({ message: 'você precisa se autenticar' });
    }
    else {
        //vamos verificar o token lembrando de passar o password da aplicação
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next(); //tudo certo pode deixa passar
            }
            else {
                resp.status(403).json({ message: 'Não autorizado' });
            }
        });
    }
};
function extraIrToken(req) {
    var token = undefined;
    if (req.header && req.headers.authorization) {
        //Authorization: Bearer XXX.XXX.XXX
        console.log(req.headers.authorization);
        var parts = req.headers.authorization.split(' '); //dividir pelo espaçõ
        if (parts.length == 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
