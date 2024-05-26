# Juan Pablo Hernández - 202122707


# Documentación POSTMAN

1. Profesor
Crear Profesor
URL: http://localhost:3000/profesores
Método: POST
Body:


{
  "numeroCedula": 123456789,
  "nombre": "Juan Perez",
  "grupoInvestigacion": "TICSW",
  "numeroExtension": 1234
}
Response (201 Created):


{
  "id": 1,
  "numeroCedula": 123456789,
  "nombre": "Juan Perez",
  "grupoInvestigacion": "TICSW",
  "numeroExtension": 1234
}
Obtener Profesor por ID
URL: http://localhost:3000/profesores/1
Método: GET
Response (200 OK):


{
  "id": 1,
  "numeroCedula": 123456789,
  "nombre": "Juan Perez",
  "grupoInvestigacion": "TICSW",
  "numeroExtension": 1234
}
Response (404 Not Found):


{
  "statusCode": 404,
  "message": "Profesor con ID 1 no encontrado",
  "error": "Not Found"
}
Eliminar Profesor por ID
URL: http://localhost:3000/profesores/1
Método: DELETE
Response (200 OK):


{
  "message": "Profesor eliminado exitosamente"
}
Response (400 Bad Request):


{
  "statusCode": 400,
  "message": "El profesor no se puede eliminar porque tiene propuestas con proyectos asociados.",
  "error": "Bad Request"
}

2. Estudiante
Crear Estudiante
URL: http://localhost:3000/estudiantes
Método: POST
Body:


{
  "nombre": "Maria Lopez",
  "codigoEstudiante": "2023000010",
  "numeroCreditosAprobados": 30
}
Response (201 Created):


{
  "id": 1,
  "nombre": "Maria Lopez",
  "codigoEstudiante": "2023000010",
  "numeroCreditosAprobados": 30
}
Obtener Estudiante por ID
URL: http://localhost:3000/estudiantes/1
Método: GET
Response (200 OK):


{
  "id": 1,
  "nombre": "Maria Lopez",
  "codigoEstudiante": "2023000010",
  "numeroCreditosAprobados": 30
}
Response (404 Not Found):


{
  "statusCode": 404,
  "message": "Estudiante con ID 1 no encontrado",
  "error": "Not Found"
}


3. Propuesta
Crear Propuesta
URL: http://localhost:3000/propuestas
Método: POST
Body:


{
  "titulo": "Nueva Propuesta",
  "descripcion": "Descripción detallada de la propuesta",
  "palabraClave": "Innovación"
}
Response (201 Created):


{
  "id": 1,
  "titulo": "Nueva Propuesta",
  "descripcion": "Descripción detallada de la propuesta",
  "palabraClave": "Innovación"
}
Obtener Propuesta por ID
URL: http://localhost:3000/propuestas/1
Método: GET
Response (200 OK):


{
  "id": 1,
  "titulo": "Nueva Propuesta",
  "descripcion": "Descripción detallada de la propuesta",
  "palabraClave": "Innovación"
}
Response (404 Not Found):


{
  "statusCode": 404,
  "message": "Propuesta con ID 1 no encontrada",
  "error": "Not Found"
}


4. Proyecto
Crear Proyecto
URL: http://localhost:3000/proyectos
Método: POST
Body:


{
  "fechaInicio": "2023-01-01T00:00:00.000Z",
  "fechaFin": "2023-12-31T23:59:59.999Z",
  "url": "http://example.com/proyecto"
}
Response (201 Created):


{
  "id": 1,
  "fechaInicio": "2023-01-01T00:00:00.000Z",
  "fechaFin": "2023-12-31T23:59:59.999Z",
  "url": "http://example.com/proyecto"
}
Obtener Proyecto por ID
URL: http://localhost:3000/proyectos/1
Método: GET
Response (200 OK):


{
  "id": 1,
  "fechaInicio": "2023-01-01T00:00:00.000Z",
  "fechaFin": "2023-12-31T23:59:59.999Z",
  "url": "http://example.com/proyecto"
}
Response (404 Not Found):


{
  "statusCode": 404,
  "message": "Proyecto con ID 1 no encontrado",
  "error": "Not Found"
}


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
