
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router');
const { novoUsuario, showUsers, deleteUser } = require('./controller/user.js');

var router = new Router();

const PORT = process.env.PORT || 3000;


// koa.use(bodyParser())

router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

router.get('/user', async ctx => {
  ctx.body = await showUsers();
})

router.get('/user/:nome', async ctx => {
  const nome = ctx.params.nome
  ctx.body = await showUser(nome);
})

router.post('/user', async ctx => {
  let user = ctx.request.body
  product = await novoUsuario(user)
  if (product == 400) {
    ctx.response.status = product;
    ctx.body = "Idade minima 18"
  } else {
    ctx.response.status = 201;
    ctx.body = user
  }
})

router.delete('/user', async ctx => {
  let nome = ctx.request.body
  product = await deleteUser(nome)

})

module.exports = router;