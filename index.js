const express = require('express');
const app = express();


const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Resposta da API');
});


app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
