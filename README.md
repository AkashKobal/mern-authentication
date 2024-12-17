# MERN Authentication System

This project is a **MERN stack** authentication system, enabling user registration, login, email verification via OTP, and session management using JSON Web Tokens (JWT).

## Features
- User registration with hashed passwords (using `bcrypt`).
- Secure user login with JWT-based authentication.
- Email verification with OTP (via `nodemailer`).
- Token-based authentication and authorization.
- MongoDB integration for user data storage.

## Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/) (for API testing)

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   SENDER_EMAIL=<your_email>
   EMAIL_PASSWORD=<your_email_password>
   ```

4. Start the development server:
   ```bash
   npm run server
   ```

## Package Overview

### Dependencies
- **bcrypt**: Password hashing.
- **cookie-parser**: Middleware to parse cookies in requests.
- **cors**: Enable Cross-Origin Resource Sharing.
- **dotenv**: Load environment variables from a `.env` file.
- **express**: Web framework for building APIs.
- **joi**: Data validation for user inputs.
- **jsonwebtoken**: Generate and verify JWT tokens.
- **mongoose**: ODM library for MongoDB.
- **nodemailer**: Send emails for OTP verification.

### Dev Dependencies
- **nodemon**: Automatically restart the server during development.

## API Endpoints

### 1. **User Registration**
**POST** `/api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully. Please verify your email."
  }
  ```

### 2. **User Login**
**POST** `/api/auth/login`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "<jwt_token>"
  }
  ```

### 3. **Send OTP**
**POST** `/api/auth/send-otp`
- **Description**: Send an OTP to the user's registered email.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully."
  }
  ```

### 4. **Verify OTP**
**POST** `/api/auth/verify-otp`
- **Description**: Verify the OTP sent to the user's email.
- **Request Body**:
  ```json
  {
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Account verified successfully."
  }
  ```

### 5. **Get User Details**
**GET** `/api/auth/me`
- **Description**: Fetch the authenticated user's details.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt_token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "<user_id>",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

## File Structure
```
server/
├── server.js         # Entry point of the application
├── models/           # Mongoose models
├── routes/           # API routes
├── controllers/      # Route handlers
├── middleware/       # Custom middleware (e.g., authentication)
├── utils/            # Utility functions (e.g., email handling)
└── .env              # Environment variables
```

## Future Enhancements
- Add refresh tokens for enhanced security.
- Implement role-based access control (RBAC).
- Add social login integration (Google, Facebook).
- Improve email templates using HTML.

## Contributing
Feel free to contribute by submitting issues or pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

