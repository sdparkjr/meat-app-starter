
//https://github.com/typicode/json-server
import * as jsonServer from 'json-server';
import { Express } from "express";

import * as fs from "fs"; //para manipular arquivos
import * as https from "https";

import { minhaAutencacao } from './auth';
import { minhaAutorizacao } from './authz';

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)


//minha rota de login
// server.post('/login', (req, resp) => {
//   resp.json({ message: 'ok' });
// })
//middleware do login
server.post('/login', minhaAutencacao)
server.use('/orders', minhaAutorizacao)

// Use default router
server.use(router)

//obter referencia do certificado com file
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

//cria o servidor HTTPS
https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running https://localhost:3001')
});

// server.listen(3000, () => {
//   console.log('JSON Server is running')
// })