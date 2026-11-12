# Employee Management System

A beginner-friendly CRUD project using HTML, CSS, JavaScript, Node.js, Express and MongoDB.

## Features

- Add an employee (name, department, role, salary and join date)
- View all employees in a table
- Search by name, department or role
- Sort by name, department, salary or join date
- Edit employee details using a pre-filled form
- Delete an employee after confirmation
- Basic frontend and backend validation
- Loading and error messages

## Project folders

```text
employee-management-system/
  backend/
    models/Employee.js
    routes/employeeRoutes.js
    server.js
    .env.example
  frontend/
    index.html
    style.css
    script.js
```

## Requirements

Install Node.js and MongoDB. MongoDB must be running locally, or use a MongoDB connection string.

## Run the backend

1. Open a terminal in the `backend` folder.
2. Install packages:

   ```bash
   npm install
   ```

3. Copy `.env.example` to a new file named `.env`.
4. Keep the local MongoDB URL or replace it with your own MongoDB connection string.
5. Start the backend:

   ```bash
   npm run dev
   ```

The API runs at `http://localhost:3000`.

## Run the frontend

Open the `frontend/index.html` file in your browser. If your browser blocks local file requests, use VS Code Live Server to serve the frontend (for example, at `http://127.0.0.1:5500`).

The frontend calls the backend at `http://localhost:3000`.

## API endpoints

Base URL: `http://localhost:3000/api/employees`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/` | Add an employee |
| GET | `/` | Get all employees |
| PUT | `/:id` | Update an employee |
| DELETE | `/:id` | Delete an employee |

### Example request body

Use this JSON body for POST and PUT:

```json
{
  "name": "Asha Patil",
  "department": "HR",
  "role": "HR Executive",
  "salary": 35000,
  "joinDate": "2026-01-15"
}
```

## Test with Postman

Import `postman/Employee-Management.postman_collection.json` into Postman. Run the GET request first. For PUT and DELETE, replace `{{employeeId}}` with an employee `_id` returned by GET or POST.

## Database schema

MongoDB collection: `employees`

Each document contains:
- `name`: String, required
- `department`: String, required
- `role`: String, required
- `salary`: Number, required, zero or more
- `joinDate`: Date, required

## Notes

- Search and sorting happen in the frontend after the backend returns the employee list.
- This is a learning project, not a production HR system. Production systems need authentication, authorization, stronger validation and deployment security.
- Do not upload your `.env` file or `node_modules` folder to GitHub.
