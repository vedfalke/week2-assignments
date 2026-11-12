# Week 2 Assignments

A collection of Week 2 web development assignments covering a responsive static website, a full-stack employee management app, and a user authentication app.

## Projects

### QuickDrop (`quickdrop -task1/frontend/`)
A responsive multi-page website for a fictional delivery company, built with plain HTML, CSS, and JavaScript. Includes home, about, services, and contact pages, a mobile navigation menu, form validation, and a demo order tracker. Open `index.html` in a browser to run it; no installation is needed.

### Employee Management System (`employee-management-system-task2/`)
A CRUD application for creating, viewing, searching, sorting, updating, and deleting employee records. The frontend uses HTML, CSS, and JavaScript; the backend uses Node.js, Express, and MongoDB. A Postman collection is included for API testing.

### Authentication App (`authentication-task3/`)
A full-stack authentication project with an Express/MongoDB backend and a React frontend built with Vite. The backend dependencies include bcrypt and JSON Web Token (JWT) support.

## Repository structure

```text
week2-assignments/
├── quickdrop -task1/
│   └── frontend/                       # Static QuickDrop website
├── employee-management-system-task2/
│   ├── backend/                        # Express API and MongoDB models
│   ├── frontend/                       # Employee management interface
│   ├── postman/                        # API request collection
│   └── README.md                       # Project-specific setup and API details
└── authentication-task3/
    ├── backend/                        # Express authentication API
    └── frontend/
        └── frontend/                   # React + Vite application
```

## Requirements

- A modern web browser
- Node.js and npm for the backend and React projects
- MongoDB for the employee management and authentication backends

## Run the projects

### QuickDrop

Open `quickdrop -task1/frontend/index.html` directly in a browser. Alternatively, serve the `frontend` folder with a static development server.

### Employee Management System

Follow the detailed instructions in [`employee-management-system-task2/README.md`](employee-management-system-task2/README.md). In brief:

1. In a terminal, change to `employee-management-system-task2/backend/` and run `npm install`.
2. Copy `.env.example` to `.env` and configure the MongoDB connection string.
3. Start the API with `npm run dev`.
4. Open `employee-management-system-task2/frontend/index.html` in a browser, or serve the frontend using a local web server.

### Authentication App

Start the backend:

```bash
cd authentication-task3/backend
npm install
```

Create a `.env` file in the backend directory and set `MONGO_URI` to your MongoDB connection string. Then run:

```bash
node server.js
```

The API listens on port `3000`. To start the frontend, open a second terminal and run:

```bash
cd authentication-task3/frontend/frontend
npm install
npm run dev
```

Vite will print the local URL in the terminal. Configure the frontend to use the backend URL if needed.

## Technologies

- HTML, CSS, and JavaScript
- Node.js and Express
- MongoDB and Mongoose
- React and Vite
- Postman

## Notes

These are learning projects. Before deploying publicly, review authentication, validation, secrets management, and other security requirements. Keep `.env` files and credentials out of version control.
