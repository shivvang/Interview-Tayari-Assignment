# 🎯 Interview Experiences Platform

A **responsive web application** designed to help users share and view interview experiences. Built with **ReactJS** for the frontend, **Node.js** for the backend, and **MongoDB** as the database, this platform supports **CRUD operations** and secure **authentication** to enhance the user experience. 🚀

---

## ✨ Features

### 🔒 **User Authentication**
- Secure login, registration, and session management using **JWT**.
- Users can manage their own submissions while preventing unauthorized access to others' data.

### 🛠️ **CRUD Operations**
- **Create**: Submit interview experiences with details like company name, country, and key questions.
- **Read**: View all shared submissions on a dashboard with **pagination** for better accessibility.
- **Manage Your Submissions**: 
  - Users can view, update, or delete their own submissions. 
  - Unauthorized attempts to access others’ submissions trigger an **unlock prompt/message**.

### 📱 **Responsive Design**
- Optimized for both desktop and mobile devices to ensure a seamless experience across platforms.

### ⚡ **Error Handling**
- Provides clear and user-friendly error messages to improve the user experience.

---

## 🛠️ Setup & Installation

### ✅ **Prerequisites**
Make sure you have the following installed on your system:
- [**Node.js**](https://nodejs.org/) (for the backend server)
- [**MongoDB**](https://www.mongodb.com/cloud/atlas) (either locally or using MongoDB Atlas)

### 📂 **Clone the Repository**
Clone this repository to your local machine:
```bash
git clone https://github.com/shivvang/Interview-Tayari-Assignment.git
cd Interview-Tayari-Assignment
```

---

### 📦 **Install Dependencies**

#### Frontend:
Navigate to the `client` directory and install dependencies:
```bash
cd client
npm install
```

#### Backend:
Navigate to the `api` directory and install dependencies:
```bash
cd api
npm install
```

---

### ⚙️ **Environment Variables**

Create a `.env` file in the `api` directory and configure the following environment variables:

```env
PORT=7000
MONGO_DB_CONNECTION_URI=mongodb://localhost:27017/interviewtayari
ACCESS_TOKEN_SECRET=your_jwt_secret_key
ACCESS_TOKEN_EXPIRY=1h
ORIGIN=http://localhost:3000
```

---

### ▶️ **Run the Application**

#### Start the Backend:
From the `api` directory, run:
```bash
npm start
```

#### Start the Frontend:
From the `client` directory, run:
```bash
npm start
```

The application will now be accessible at [http://localhost:3000](http://localhost:3000).

---

## 📊 **API Endpoints**

### **POST** `/submissions`
- **Description**: Create a new interview submission.
- **Request Body**:
```json
{
  "name": "Meta",
  "questions": [
    "Explain the difference between 'var', 'let', and 'const' in JavaScript.",
    "What are closures in JavaScript, and how do they work?",
    "Describe the event loop and call stack in JavaScript.",
    "What is the difference between '==' and '===' in JavaScript?",
    "How do you handle asynchronous operations in JavaScript (e.g., using promises or async/await)?",
    "What are the different data types in JavaScript?"
  ]
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Submission created successfully.",
  "data": {
    "name": "Meta",
    "user": "67860c561f3f05bffed82ada",
    "questions": [...],
    "_id": "6787fdce35d2bea096c26fda",
    "createdAt": "2025-01-15T18:26:22.787Z",
    "updatedAt": "2025-01-15T18:26:22.787Z",
    "__v": 0
  }
}
```

---

### **GET** `/submissions`
- **Description**: Retrieve all submissions with pagination.
- **Query Parameters**:
  - `start`: Page number for pagination.
- **Response**:
```json
{
  "success": true,
  "message": "Submissions fetched successfully.",
  "data": [
    {
      "_id": "678696dadc529723fc0e917d",
      "name": "TailwindCSS",
      "user": "67860c561f3f05bffed82ada",
      "questions": [
        "What are RESTful APIs?",
        "How do you handle errors in API responses?",
        "What is the difference between GET and POST requests?"
      ],
      "createdAt": "2025-01-14T16:54:50.422Z",
      "updatedAt": "2025-01-14T17:54:13.725Z"
    }
  ]
}
```

---

## 🎨 **Design Choices**

### **Frontend**
- **ReactJS**: For a fast and interactive UI.
- **React Router**: Handles navigation and routing between pages.
- **TanStack Query**: Simplifies data fetching and state management.
- **TailwindCSS**: Provides a modern, utility-first styling approach for responsive design.

### **Backend**
- **Node.js** + **Express**: Powers the server and API endpoints.
- **MongoDB** + **Mongoose**: Schema-based modeling and database management.
- **JWT**: Provides secure token-based authentication for user sessions.

---

## ✅ **Testing**

### Submission Creation
- **Valid Input**: Ensure submissions with valid data are created successfully.
- **Invalid Input**: Test for invalid data and verify error handling.

### Submission Retrieval
- Validate API functionality to fetch submissions.
- Test pagination to confirm the correct number of results per page.

---

## 🏁 Conclusion

This platform helps users **share** and **view interview experiences**, making interview preparation easier and more collaborative. With **secure authentication**, **pagination**, and a **responsive design**, it provides a user-friendly interface for seamless interaction. 💡

---

## 📦 Dependencies

### **Frontend**
- `react`
- `react-dom`
- `react-router-dom`
- `@tanstack/react-query`
- `tailwindcss`

### **Backend**
- `express`
- `mongoose`
- `jsonwebtoken`
- `cors`
- `dotenv`

---

> 🖤 Built with passion and a commitment to improving the interview preparation process!