const express = require('express');
const produtorRoutes = require('./src/routes/produtorRoutes')
const app = express();

app.use(express.json());
app.use('/api', produtorRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
