# Brain-Agriculture

O projeto Brain-Agriculture é uma API desenvolvida para gerenciar informações sobre produtores rurais, suas fazendas, e as culturas plantadas. Este sistema permite cadastrar, editar e excluir produtores rurais, validar CPFs e CNPJs, calcular a área total de fazendas, e associar múltiplas culturas a cada produtor. Além disso, oferece um dashboard com visões agregadas, como o total de fazendas por estado, por cultura, e a distribuição de uso do solo.

# Pré-requisitos

Node.js instalado (versão recomendada 14 ou superior).
PostgreSQL instalado e configurado.
Um editor de texto ou IDE de sua preferência.

# Executando a API

Para rodar a API, execute o seguinte comando na raiz do projeto:
npm run dev

# Testando a API

Você pode testar a API usando ferramentas como Postman ou cURL. Aqui estão alguns exemplos de como você pode fazer requisições para testar diferentes endpoints:

Listar Produtores Rurais

GET /produtores

Cadastrar um Novo Produtor Rural

POST /produtores com um payload JSON contendo os detalhes do produtor.

Atualizar um Produtor Rural

PUT /produtores/:id com um payload JSON contendo as alterações.

Deletar um Produtor Rural

DELETE /produtores/:id

Para mais detalhes sobre os endpoints disponíveis e seus payloads, referencie a documentação da API ou os controladores no código-fonte.

