# 🎓 Student Course Enrollment Management System

A Full Stack Web Application built using the MERN stack (MongoDB, Express, React, Node.js) to manage student course enrollments.  

This system allows administrators to create, view, update, delete, search, and filter student enrollment records through a responsive dashboard interface.

---

## ✨ Features

### 👩🏼‍🎓 Student Management
- Add new students
- Edit existing student details
- Delete student records
- View all enrolled students in a dashboard

### 🔎 Search & Filter
- Search students by name
- Filter students by course

### 🏷️ Status Indicator
- Students with **Pending** status are visually highlighted using badges or row styling.

### ✅ Form Validation
- Email format validation
- Phone number accepts digits only
- Required field validation

### 🌐 RESTful API
- `GET /students` – Fetch all students
- `POST /students` – Create new student
- `PUT /students/:id` – Update student
- `DELETE /students/:id` – Delete student

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js
- Vite
- Axios
- Tailwind CSS / Bootstrap
- React Hooks
- Responsive Design

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- MVC Architecture

### 🗄️ Database
- MongoDB (Local or Cloud - MongoDB Atlas)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Student-Course-Enrollment-Management-System.git
cd Student-Course-Enrollment-Management-System
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint            | Description            |
|--------|--------------------|------------------------|
| GET    | /students          | Get all students       |
| POST   | /students          | Add new student        |
| PUT    | /students/:id      | Update student         |
| DELETE | /students/:id      | Delete student         |

---

