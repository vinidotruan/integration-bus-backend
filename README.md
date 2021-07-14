## Development server

Clonar o projeto
Rodar `npm install`
Rodar `npm start` o servidor ficará disponível na porta 3001 no endereço http://localhost:3001

## Rotas

#### bus-lines

[GET] - "/" - Retorna toda a lista de linhas de ônibus da api fornecida

[GET] - "/:id" - Retorna uma linha de ônibus inserida no banco de dados

[POST] - "/" - Insere uma linha de ônibus dentro do banco de dados sendo o corpo da requisição:

    {
    	"id": "09",
    	"codigo": "código da linha",
    	"nome": "nome da linha"
    }

[DELETE] - "/:id" - Exclui algum dado inserido no banco de dados

#### itineraries

[GET] - "/:id" - Retorna um etinerário fornecido pela api
