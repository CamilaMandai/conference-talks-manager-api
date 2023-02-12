API de cadastro de palestrantes. Na aplicação é possível cadastrar, visualizar, pesquisar, editar e excluir informações (CRUD).

## Para rodar a aplicação ##
A aplicação pode rodar em ambiente dockerizado (container) ou direto pelo node. 

### Docker ###
Caso opte por rodar em container, basta dar comando **docker-compose up -d**, seguido de **docker exec -it talker_manager bash** para abrir o container via CLI. No terminal do docker rode o comando **npm install** para instalar as dependências do projeto e por fim **npm start** ou **npm run dev**.

### Sem docker ###
Rode o comando **npm install**, seguido de **npm start** ou **npm run dev**.

### Testando a API ###
Depois é só testar a API a partir da sua plataforma de API cliente usual. As rotas desenvolvidas foram:

1- Endpoint POST '/login' que deve receber o corpo da requisição no seguinte formato:

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

2- Endpoint GET '/talker'

3- Endpoint GET '/talker/search?q=searchTerm', cujo 'searchTerm' se refere a um nome de palestrante

4- Endpoint GET '/talker/:id'

5- Endpoint POST '/talker' com corpo da requisição no seguinte formato:

```json
{
  "name": "Maria da Silva",
  "age": 41,
  "talk": {
    "watchedAt": "22/10/2023",
    "rate": 5
  }
}
```

5- Endpoint PUT '/talker/:id' com corpo da requisição no seguinte formato:

```json
{
  "name": "Maria da Silva",
  "age": 41,
  "talk": {
    "watchedAt": "22/10/2023",
    "rate": 5
  }
}
```

6- Endpoint DELETE /talker/:id
