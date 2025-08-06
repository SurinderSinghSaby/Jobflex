# Jobflex

Jobflex is a MERN stack application designed to help users efficiently manage their job applications with a clean and intuitive interface.

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [FAQ](#faq)
- [Contact](#contact)

---

## About
Jobflex enables users to track their job hunt progress all in one place.

---

## Features
- Add, edit, and delete job applications
- Track application status (e.g., applied, interview, offer, rejected)
- Set reminders and notes
- Filter and search applications
- Responsive design for desktop and mobile
- User authentication (registration and login)
- Secure backend API

---

## Tech Stack
- **Frontend:** React.js, CSS, HTML
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas cloud)

### Installation

**Clone the repository**
```bash
git clone https://github.com/SurinderSinghSaby/Jobflex.git
cd Jobflex
```

**Install frontend dependencies**
```bash
cd client
npm install
```

**Install backend dependencies**
```bash
cd ../server
npm install
```

### Environment Variables
Create a `.env` file in the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## Running Locally

**Start backend server and frontend server**
```bash
docker compose up --build
```



Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## API Documentation

### Authentication
#### POST `/api/auth/register`
Registers a new user.  
**Body:**  
```json
{ "username": "yourname", "email": "you@example.com", "password": "yourpassword" }
```

#### POST `/api/auth/login`
Logs in an existing user.  
**Body:**  
```json
{ "email": "you@example.com", "password": "yourpassword" }
```

---

### Applications
#### GET `/api/applications`
Returns the user's job applications.

#### POST `/api/applications`
Adds a new application.  
**Body:**  
```json
{ "position": "Developer", "company": "ABC Corp", "status": "applied", "notes": "Follow up next week" }
```

#### PUT `/api/applications/:id`
Updates an application.

#### DELETE `/api/applications/:id`
Deletes an application.

---

## Usage Guide
1. **Register and log in** to create your personal dashboard.
2. Click **"Add Application"** to track a new job.
3. Use filters to sort by status, company, or date.
4. Edit or delete applications as needed.
5. Add notes and reminders for each application.

---

## Troubleshooting
- **Server not starting:** Double-check `.env` variables, especially `MONGO_URI`.
- **Frontend not loading:** Ensure backend is running and CORS is enabled.
- **Database errors:** Verify MongoDB service is running and accessible.

---

## Screenshots


---


## License
This project is licensed under the **MIT License**.

---


## Contact
**Creator:** Surinder Singh Saby  
For questions, suggestions, or feedback, please open an issue or reach out via [GitHub](https://github.com/SurinderSinghSaby).
