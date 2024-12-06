# Railway Management System API

This is a Railway Management System API that allows users to check train availability between stations, book seats, and view booking details. The API is built with **Node.js**, **Express.js**, and **MySQL**.

## Features

- **User Registration**: Register a new user.
- **User Login**: User login to get a JWT token.
- **Add Train (Admin only)**: Admin can add new trains to the system.
- **Get Seat Availability**: Users can check available trains and seats between two stations.
- **Book a Seat**: Users can book seats on a train.
- **Get Booking Details**: Users can view their booking details.

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/railway-management-api.git
cd railway-management-api
npm install
```

```bash

DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=railway_management
SECRET_KEY=your_secret_key
ADMIN_API_KEY=your_admin_api_key
```


### 2. Set Up the Database

```bash
CREATE DATABASE railway_management;
```

```bash
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```bash
CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    totalSeats INT NOT NULL,
    availableSeats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```bash

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trainId INT NOT NULL,
    userId INT NOT NULL,
    bookingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trainId) REFERENCES trains(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

```bash
INSERT INTO trains (name, source, destination, totalSeats, availableSeats)
VALUES
('Shatabdi Express', 'Delhi', 'Lucknow', 200, 150),
('Rajdhani Express', 'Delhi', 'Lucknow', 150, 50),
('Ganga Yamuna Express', 'Delhi', 'Lucknow', 100, 75),
('Jan Shatabdi', 'Delhi', 'Lucknow', 180, 120);
```


### 3. Run the Environment

```bash
npm run dev

```
### 4. Test API EndPoints

```bash
http://localhost:3000/api/register
http://localhost:3000/api/login
http://localhost:3000/api/admin/trains
http://localhost:3000/api/users/seats?source=Delhi&destination=Lucknow
http://localhost:3000/api/users/book
http://localhost:3000/api/users/bookings
```

