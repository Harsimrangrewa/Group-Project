# PROG3271 – Florist Business (Backend API)

# Milestone 4 – Authentication System

# Group 2

- Harsimrandeep Kaur
- Gurleen Kaur

# Overview

This is the backend for our Florist Business project.  
In Milestone 4, we added user login, registration, JWT authentication, and one protected route.  
This backend will be used later with the frontend.

## Features

- Register a user
- Login and get a JWT token
- Protected route using middleware
- Users stored in a text file (users.txt)
- Express server with TypeScript

## How to Run

1. Install packages:
   npm install

2. Make a `.env` file:
   PORT=3001
   JWT_SECRET=supersecretkey123

3. Start the server:
   npm run dev

Server runs at:
http://localhost:3001

## Testing (Postman)

### 1. Register

POST  
http://localhost:3001/auth/register
Body:

```json
{
  "username": "test",
  "password": "1234"
}
2. Login
POST
http://localhost:3001/auth/login
Body:

json
{
  "username": "test",
  "password": "1234"
}
Copy the token. and paste in dashboard

3. Protected Route
GET
http://localhost:3001/dashboard
Header:
Authorization: Bearer <token>


# Files Included
index.ts
routes folder
middleware folder
models folder
users.txt
package.json
tsconfig.json
```
