# Employee Management System

## Overview
The **Employee Management System** is a MERN stack application designed to help businesses manage employee data efficiently. 
It includes features for attendance tracking, leave management, salary records, and department management. 
The system offers role-based access control for admin and employees, providing a streamlined interface for both.

### Live Demo
You can view the live demo of the project hosted on Vercel here:  
[Employee Management System Live](https://employeems-client-pi.vercel.app)  

---

## Features
- **Admin Dashboard**:
  - Manage employee data (CRUD operations).
  - Approve/reject leave requests.
  - Manage departments and salary information.
  - View employee attendance records and performance metrics.
  - Send email notifications to employees.
  
- **Employee Dashboard**:
  - Clock in/out for attendance tracking.
  - Request leave and view status.
  - View personal salary information and attendance history.
  
- **Authentication**:
  - Secure login for admins and employees with role-based access.
  - JWT-based authentication and authorization.

---

## Screenshots

### Home Page
![Home Page]![image](https://github.com/user-attachments/assets/c1d19911-74ea-4f38-af03-8afd175ee5c4)

### Login Page
![Login Page]![image](https://github.com/user-attachments/assets/dbb162da-20ee-436a-880c-c30691231971)

### Admin Dashboard
![Admin Dashboard]![image](https://github.com/user-attachments/assets/f86244e7-a696-4dd3-a8d8-a1a7e7a231a0)

### Employee Dashboard
![Employee Dashboard]![image](https://github.com/user-attachments/assets/585219c1-d5b7-4ee0-a82c-dfe872db0fdc)

---

## Technologies Used
- **Frontend**: React.js (Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer / EmailJS
- **CSS**: Tailwind CSS

---

## Setup and Installation

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB setup

### Inatall Dependencies

1. Navigate to the project directory:
```bash
cd employee-management-system
```
2. Install backend dependencies:
```bash
cd backend
npm install
```
3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```
### Environment Variables
Create a .env file in the backend directory and add the following:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
```

### Running the Application
1. Start the backend server:
```bash
cd backend
npm start
```
2. Start the frontend server:
```bash
cd frontend
npm run dev
```

Now the app should be running locally. Visit http://localhost:3000 to view the frontend, 
and the backend should run on http://localhost:5000.

### Clone the Repository
```bash
https://github.com/adithyanS007/employeems-server.git 
```

### Usage
Admin Login
The admin can log in using the following credentials:

Username: admin@gmail.com
Password: admin

Employee Login
Employees will be provided unique login credentials by the admin to access their dashboard.


### Contributing
Contributions are welcome! If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for more details [visit this website](https://opensource.org/license/MIT)
