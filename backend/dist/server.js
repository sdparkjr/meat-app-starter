"use strict";
exports.__esModule = true;
//https://github.com/typicode/json-server
var jsonServer = require("json-server");
var fs = require("fs"); //para manipular arquivos
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
//minha rota de login
// server.post('/login', (req, resp) => {
//   resp.json({ message: 'ok' });
// })
//middleware do login
server.post('/login', auth_1.minhaAutencacao);
server.use('/orders', authz_1.minhaAutorizacao);
// Use default router
server.use(router);
//obter referencia do certificado com file
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
//cria o servidor HTTPS
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running https://localhost:3001');
});
// server.listen(3000, () => {
//   console.log('JSON Server is running')
// }) 
