## Development server

Clonar o projeto
Rodar `npm install`
Rodar `npm start` o servidor ficará disponível na porta 3001 no endereço http://localhost:3001

## Banco de dados

Criar database com o nome desejado;
Configurar o acesso do banco no arquivo `src/mysql.js`;
Para popular o banco de dados basta rodar o comando `npm run fetch-db`

## Rotas

#### bus-lines

[GET] - "/" - Retorna toda a lista de linhas de ônibus

[GET] - "/name?name=Nome Da Linha" - Retorna todas as linhas com aquele nome

[POST] - "/" - Insere ou atualiza uma linha de ônibus dentro do banco de dados sendo o corpo da requisição:

    {
    	"id": "09",
    	"codigo": "código da linha",
    	"nome": "nome da linha"
    }

[DELETE] - "/:id" - Exclui algum dado inserido no banco de dados

#### itineraries

[GET] - "/:id" - Retorna um etinerário fornecido pela api
