# Desafio Intmed - API Mock

Aplicacao Nodejs para servir os endpoints da API do Medicar de forma mocada para facilitar o desenvolvimento do desafio frotend.

## Instalacao
Para instalar os pacotes necessários da aplicação, basta rodar o seguinte comando no seu terminal:

```$ npm install ```

Apos a instalação dos pacotes ser concluída, inicie a aplicação com o seguinte comando:

```$ npm run start```

Com isso, a aplicação estará rodando na porta 3000

## Autenticação
Para que seja possível utilizar os endpoints, é necessário primeiramente obter um token de acesso através do seguinte endpoint via POST:

```
POST /users/login
```

Passando os seguintes dados de autenticação:
```json
{
  "username": "intmed",
  "password": "challenge"
}
```
Com isso, a API retornará um token de acesso que deverá ser utilizado na chamada dos endpoints de consultas, medicos, agendas e especialidades.
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
}
```
Para realizar a chamada dos endpoints mencionados anteriormente, deverá ser passado um header de autorizacao (Authorization) na chamada HTTP no seguinte formato:
```
Authorization   Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

## Endpoints

### Login
Endpoint responsável por retornar um token de acesso à API

#### Requisição
```
POST /users/login
```
```json
{
  "username": <string>,
  "password": <string>
}
```

### Cadastro
Endpoint responsável por cadastrar um novo usuário no Medicar (O valor de retorno é mockado, retornando sempre o mesmo usuário).

```
POST /users
```
```json
{
  "username": <string>,
  "email": <string>,
  "password": <string>
}
```

### Listar especialidades médicas
Lista todas as especialidades médicas disponíveis na clínica

#### Requisição
```
GET /especialidades/
```

#### Resposta
```json
[
    {
      "id": 1,
      "nome": "Pediatria"
    },
    {
      "id": 2,
      "nome": "Ginecologia"
    },
    {
      "id": 3,
      "nome": "Cardiologia"
    },
    {
      "id": 4,
      "nome": "Clínico Geral"
    }
]
```

#### Filtros
* Nome da especialidade (termo de pesquisa)

```
GET /especialidades/?search=ped
```

### Listar médicos
Lista todos os médicos que atendem pela clínica

#### Requisição
```
GET /medicos/
```
#### Retorno
```json
[
    {
      "id": 1,
      "crm": 3711,
      "nome": "Drauzio Varella",
      "especialidade": {
            "id":2,
            "nome": "Pediatria"
        }
    },
    {
      "id": 2,
      "crm": 2544,
      "nome": "Gregory House",
      "especialidade": {
          "id": 3,
          "nome": "Cardiologia"
        }
    },
    {
      "id": 3,
      "crm": 3087,
      "nome": "Tony Tony Chopper",
      "especialidade": {
            "id":2,
            "nome": "Pediatria"
        }
    }
]
```

#### Filtros

* Identificador de uma ou mais especialidades
* Nome do médico (termo de pesquisa)

```
GET /medicos/?search=maria&especialidade=1&especialidade=3
```

### Listar consultas marcadas
Lista todas as consultas marcadas do usuário logado

#### Requisição
```
GET /consultas/
```

#### Retorno
```json
[
    {
      "id": 1,
      "dia": "2020-02-05",
      "horario": "12:00",
      "data_agendamento": "2020-02-01T10:45:0-03:00",
      "medico": {
        "id": 2,
        "crm": 2544,
        "nome": "Gregory House",
        "especialidade": {
          "id": 3,
          "nome": "Cardiologia"
        }
      }
    },
    {
      "id": 2,
      "dia": "2020-03-01",
      "horario": "09:00",
      "data_agendamento": "2020-02-01T10:45:0-03:00",
      "medico": {
        "id": 1,
        "crm": 3711,
        "nome": "Drauzio Varella",
        "especialidade": {
            "id":2,
            "nome": "Pediatria"
        }
      }
    }
]
```

### Listar agendas disponíveis
Lista todas as agendas disponíveis na clínica

```json
[
    {
      "id": 1,
      "medico": {
        "id": 3,
        "crm": 3087,
        "nome": "Tony Tony Chopper",
        "especialidade": {
            "id":2,
            "nome": "Pediatria"
        }
      },
      "dia": "2020-02-10",
      "horarios": ["14:00", "14:15", "16:00"]
    },
    {
      "id": 2,
      "medico": {
        "id": 2,
        "crm": 2544,
        "nome": "Gregory House",
        "especialidade": {
          "id": 3,
          "nome": "Cardiologia"
        }
      },
      "dia": "2020-02-10",
      "horarios": ["08:00", "08:30", "09:00", "09:30", "14:00"]
    }
]
```

#### Filtros
* Identificador de um ou mais médicos
* Identificador de uma ou mais especialidades
* Intervalo de data

```
GET /agendas/?medico=1&especialidade=2&data_inicio=2020-01-01&data_final=2020-01-05
```

### Marcar consulta
Marca uma consulta para o usuário logado

#### Requisição

```
POST /consultas/
```
```json
{
  "agenda_id": 1,
  "horario": "14:15"
}
```
#### Retorno

```json
{
  "id": 2,
  "dia": "2020-03-01",
  "horario": "09:00",
  "data_agendamento": "2020-02-01T10:45:0-03:00",
  "medico": {
    "id": 1,
    "crm": 3711,
    "nome": "Drauzio Varella",
    "especialidade": {
            "id":2,
            "nome": "Pediatria"
        }
  }
}
```

### Desmarcar consulta
Desmarca uma consulta marcada pelo usuário

#### Requisição
```
DELETE /consultas/<consulta_id>
```

#### Retorno
Não há retorno (vazio)
