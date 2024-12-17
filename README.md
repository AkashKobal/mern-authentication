# MERN Authentication System

A secure and scalable authentication system built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project supports user registration, login, logout, OTP-based email verification, and JWT-based authentication.

## Features

- **User Registration**: Securely register new users with hashed passwords.
- **User Login**: Authenticate users with email and password.
- **JWT Authentication**: Issue JSON Web Tokens for session management.
- **Email Verification**: Send OTP to users for account verification.
- **Protected Routes**: Middleware to secure endpoints.
- **Role-based Access**: User roles (e.g., admin, user).
- **Password Reset**: OTP-based password reset functionality.

---

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.

### Security & Utilities
- **bcrypt**: Hashing library for password security.
- **jsonwebtoken**: For issuing and verifying tokens.
- **Joi**: Schema validation for inputs.
- **Nodemailer**: For sending emails.
- **dotenv**: Environment variable management.

---

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running locally or a cloud MongoDB URI.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AkashKobal/mern-authentication.git
   cd mern-authentication
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and configure the following variables:
   ```
   MONGO_URI=your-mongo-db-uri
   JWT_SECRET=your-jwt-secret
   SENDER_EMAIL=your-email
   SENDER_PASSWORD=your-email-password
   NODE_ENV=development
   ```

4. **Run the Server**
   ```bash
   npm run server
   ```

---

## API Endpoints

### Authentication Routes

- **POST** `http://localhost:5000/api/auth/register`
  - Registers a new user.
  - Required Fields: `name`, `email`, `password`.

- **POST** `http://localhost:5000/api/auth/login`
  - Authenticates an existing user.
  - Required Fields: `email`, `password`.

- **POST** `http://localhost:5000/api/auth/logout`
  - Logs out the user by clearing the token.

- **POST** `http://localhost:5000/api/auth/send-otp`
  - Sends OTP for email verification.
  - Required Fields: `userId`.

- **POST** `http://localhost:5000/api/auth/verify-otp`
  - Verifies email using OTP.
  - Required Fields: `otp`, `userId`.

- **GET** `http://localhost:5000/api/auth/is-authenticated`
  - Checks if the user is authenticated.
  - Requires a valid JWT token.

---

## Project Structure

```
/server
  |-- /Controllers      # Business logic for routes
  |-- /Middleware       # Middleware for validation and authentication
  |-- /Models           # Mongoose schemas for database
  |-- /Routes           # API endpoints
  |-- /Config           # Configuration files (e.g., nodemailer, database)
  |-- server.js         # Main entry point
```

---

## Middleware

- **Validation Middleware**:
  - `registerValidation`: Validates user registration inputs.
  - `loginValidation`: Validates login inputs.

- **Authentication Middleware**:
  - `userAuth`: Validates JWT tokens and protects routes.

---

## Future Enhancements

- Password reset functionality.
- Enhanced role-based access control (RBAC).
- Integration with frontend (React.js).
- Rate limiting and advanced security features.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

