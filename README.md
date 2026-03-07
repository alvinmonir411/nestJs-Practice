# NestJS Authentication API

A progressive [NestJS](https://nestjs.com/) application featuring a complete authentication flow using JWT, TypeORM, and PostgreSQL.

## Features

- **User Registration**: Hash passwords securely using `bcrypt`.
- **User Login**: Authenticate and generate JSON Web Tokens (JWT).
- **Database Integration**: TypeORM connected to a PostgreSQL database.
- **Role Management**: Basic user roles (`USER`, `ADMIN`).

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (v11)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: `@nestjs/jwt`, `bcrypt`

---

## Project Setup

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18 or higher recommended)
- PostgreSQL (running natively or via Docker)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd nestjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup your PostgreSQL Database. In `src/app.module.ts`, the database connection is configured as follows:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Username**: `postgres`
   - **Password**: `13663`
   - **Database Name**: `nestjs_db`

   Make sure to create a database named `nestjs_db` in your PostgreSQL instance before running the app. Auto-synchronize is enabled (`synchronize: true`), so tables will be created automatically.

### Running the Application

```bash
# development mode
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

By default, the application runs on **http://localhost:3000**.

---

## API Endpoints

### 1. Register a New User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "name": "Jane Doe",
    "email": "[EMAIL_ADDRESS]",
    "phone": "1234567890",
    "password": "securepassword123"
  }
  ```
- **Response**: Returns the created user object along with the JWT access token.

### 2. User Login
- **URL**: `/auth/login`
- **Method**: `GET` (Note: Send the credentials in the request body)
- **Body** (JSON):
  ```json
  {
    "email": "[EMAIL_ADDRESS]",
    "password": "securepassword123"
  }
  ```
- **Response**: Returns user details upon successful authentication.

---

## License

This project is build by alvin monir. Check out my portfolio: [https://alvinmonir.vercel.app/](https://alvinmonir.vercel.app/)
