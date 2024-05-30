# Node Template REST API

This reporsitory contains a template for projects with Node, Express, Typescript. The test environment has been configured using Jest, and ESLint and Prettier have been integrated to set code style definitions. You can find the step-by-step construction of this project in this article:

[Boilerplate for your Node projects with Express](https://baguilar6174.medium.com/boilerplate-for-your-node-projects-with-express-add98ea89c9f)

Explore the world of API development using Node.js, Express, and TypeScript. Learn how to implement Clean Architecture and best programming practices to create robust, scalable, and maintainable web services. Whether you're a seasoned developer or just starting out, this repository provides comprehensive resources, tutorials, and examples to help you master API development with confidence.

[Modern API Development with Node.js, Express, and TypeScript using Clean Architecture](https://baguilar6174.medium.com/modern-api-development-with-node-js-express-and-typescript-using-clean-architecture-0868607b76de)

## Installation

Clone this repository

```bash
git clone https://github.com/baguilar6174/node-template-server.git
```

Install dependencies

```bash
yarn
```

Clone `.env.template` file and rename to `.env`.

Replace your environment variables in `.env` file

## Running the app

Run `yarn dev`

If your want to create build production, run `yarn build`

If your want to run tests, run `yarn test || yarn test:watch`

## My process

### Built with

- Node
- Typescript
- Express
- ESLint & Prettier
- Environment Variables
- Unit testing with Jest & Supertest
- Clean Architecture
- Repository Pattern
- Adapter Pattern
- Use Cases
- DTOs (Data Transfer Objects)

## API Documentation

This entire implementation is based on an in-memory database for example purposes. **NO** real database is being used, when the server is re-run, the in-memory database **will be re-created**.

Also, simple implementations have been created to **encrypt** and **validate authentication tokens** (no third party dependencies are used for this). If you use this repository as an example, it is recommended that you modify these implementations using libraries or your own implementations (`src/core/config` folder).

### Authentication

### POST `/api/v1/auth/register`

Registers a new user in memory database.

#### Request Body

```json
{
	"name": "string",
	"email": "string",
	"password": "string"
}
```

#### Response Codes

- `400 Bad Request`: Returned if the request body is invalid.
- `201 Created`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"user": {
			"id": "string",
			"name": "string",
			"email": "string",
			"emailVerified": "boolean",
			"role": "string[]"
		},
		"token": "string"
	}
}
```

### POST `/api/v1/auth/login`

Logs in a user.

#### Request Body

```json
{
	"email": "string",
	"password": "string"
}
```

#### Response Codes

- `400 Bad Request`: Returned if the request body is invalid.
- `200 OK`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"user": {
			"id": "string",
			"name": "string",
			"email": "string",
			"emailVerified": "boolean",
			"role": "string[]"
		},
		"token": "string"
	}
}
```

---

### GET `/api/v1/todos`

Retrieves a paginated list of todos.

#### Query Parameters

- `page` (number, optional): The page number to retrieve. Defaults to `1`.
- `limit` (number, optional): The number of items per page. Defaults to `10`.

#### Response Codes

Ensure that the values for page and limit are valid positive integers to avoid errors.

- `400 Bad Request`: Returned if query parameters are invalid.
- `200 OK`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"results": [
			{
				"id": "number",
				"text": "string",
				"isCompleted": "boolean"
			}
		],
		"currentPage": "number",
		"nextPage": "number | null",
		"prevPage": "number | null",
		"total": "number",
		"totalPages": "number"
	}
}
```

### GET `/api/v1/todos/:id`

Retrieves a single todo item by its id.

#### Path Parameters

- `id` (number): The id of the todo item to retrieve.

#### Response Codes

- `404 Not Found`: Returned if the todo item with the specified id does not exist.
- `200 OK`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"id": "number",
		"text": "string",
		"isCompleted": "boolean"
	}
}
```

### POST `/api/v1/todos`

Creates a new todo item. You need to be `logged in` previously. This endpoint requires authorization because it is protected with AuthMiddleware.

#### Authorization

Bearer `<token>`

#### Request Body

```json
{
	"text": "string"
}
```

#### Response Codes

- `401 Unauthorized`: Returned if the request is not authorized.
- `400 Bad Request`: Returned if the request body is invalid.
- `201 Created`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"id": "number",
		"text": "string",
		"isCompleted": "boolean"
	}
}
```

### PUT `/api/v1/todos/:id`

Updates a todo item properties by its id.

#### Path Parameters

- `id` (number): The id of the todo item to update.

#### Request Body

```json
{
	"text": "string",
	"isCompleted": "boolean"
}
```

#### Response Codes

- `404 Not Found`: Returned if the todo item with the specified id does not exist.
- `400 Bad Request`: Returned if the request body is invalid.
- `200 OK`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"id": "number",
		"text": "string",
		"isCompleted": "boolean"
	}
}
```

### DELETE `/api/v1/todos/:id`

Deletes a todo item by its id.

#### Path Parameters

- `id` (number): The id of the todo item to delete.

#### Response Codes

- `404 Not Found`: Returned if the todo item with the specified id does not exist.
- `200 OK`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"id": "number",
		"text": "string",
		"isCompleted": "boolean"
	}
}
```

---

## Project Structure

```bash
node-template-server/
│
├── dist/
├── node_modules/
├── src/
│   ├── core/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── errors/
│   │   └── types/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── datasources/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── local.datasource.impl.ts
│   │   │   │   └── repository.impl.ts
│   │   │   │
│   │   │   └── presentation/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── domain/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   └── presentation/
│   │   │       └── middlewares/
│   │   │
│   │   ├── todos/
│   │   │   ├── domain/
│   │   │   │   ├── datasources/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── local.datasource.impl.ts
│   │   │   │   └── repository.impl.ts
│   │   │   │
│   │   │   └── presentation/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   └── ...
│   ├── app.test.ts
│   ├── app.ts
│   ├── routes.ts
│   ├── server.ts
│   └── testServer.ts
├── .env
├── .env.template
├── .env.test
├── ...
├── package.json
└── ...
```

### Domain — Entities

Entities are objects that represent fundamental concepts of the application domain. These objects encapsulate the essential state and behavior of key elements within the system.

### Domain — Repositories

Repositories are a data access abstraction that act as an interface between the domain layer and the infrastructure layer. Their primary purpose is to encapsulate the logic related to data storage and retrieval, providing an abstraction layer that allows the domain layer to work with entities without worrying about the specific details of how data is stored or retrieved.

### Domain — Use cases

Use cases represent the specific actions or functionalities that can be performed by a user or a system within the application. These use cases encapsulate the business logic in a way that is independent of infrastructure and implementation details, making them portable and reusable in different contexts.

### Domain — Data sources

Data sources are interfaces or abstractions that represent the data source from which the data needed for the application is obtained. These data sources can be databases, web services, file systems, or any other form of data storage. The use of data sources helps decouple business logic from the specific details of the data source. This means that the domain layer can work with data sources through generic interfaces without knowing the specific implementation details, making it easy to exchange or update the data source without affecting the application logic.

### Domain — DTOs

DTOs (Data Transfer Objects) are objects that are used to transfer data between different layers of the application, especially between the presentation layer and the domain or infrastructure layer. DTOs encapsulate related data and transport it from one context to another without exposing the underlying business logic. The main function of DTOs is to represent information in a structured and coherent way, facilitating its transport through the application.

### Infrastructure — Repository Implementation

The repository implementation at the infrastructure layer is responsible for providing a concrete implementation of the methods defined in the repository interface at the domain layer. This implementation is responsible for interacting with the actual data source, such as a database, an external service or any other data persistence mechanism.

### Infrastructure — Data source Implementation

The data source implementation in the infrastructure layer is responsible for providing a concrete implementation of the methods defined in the data source interface in the domain layer. This component is responsible for interacting directly with the actual data source, such as a database, a web service or any other data storage medium.

### Presentation— Controller

Controllers are presentation layer components that act as entry points for client requests in an application. These controllers are responsible for receiving HTTP requests, processing them and directing them to the corresponding business logic in the domain layer.

### Presentation — Routes

Routes are presentation layer components that are responsible for defining routes and handling incoming HTTP requests to an application. These routes are used to map HTTP requests to the corresponding controllers and establish the API structure or routing of the application. It is also where our data source and our repository are initialized, the same that is necessary for our controller.

---

Implementing a REST API using Node.js, Express and following good development practices and Clean Architecture provides a solid foundation for developing modern and scalable web applications. By taking a modular approach and focusing on separation of concerns, developers can achieve a clean, maintainable architecture that encourages flexibility and continuous system evolution.

The application of Clean Architecture allows you to maintain a clear separation between the different layers of the application, such as the domain layer, the infrastructure layer, and the presentation layer, making it easier to understand and maintain the code over time. Additionally, adopting good development practices such as using middlewares for intermediate tasks, validating input data, and proper error handling contributes to creating a robust and secure API.

---

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
