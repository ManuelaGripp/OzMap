//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables

const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const db = require('./database/DBconfig.js');
const userRoutes = require('./routes.js')

const koa = new Koa();

koa.use(bodyParser())

koa.use( userRoutes.routes()).use(userRoutes.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;