# 🐾 Pawsitive Homes – Pet Adoption & Donation System

This project is a **MERN stack (MongoDB, Express, React, Node.js)** application designed to connect users with pets in need of adoption and allow secure donations. The system includes role-based features for **users** and **administrators**, with PayPal donation integration and email notifications.

---

## ✨ Features

- **User Management**

  - Register, log in, and manage profile
  - Update password, view adoption requests, and donation history

- **Pet Management**

  - Browse pet gallery with filters (category, gender, status)
  - View pet details and submit adoption requests

- **Adoption Management**

  - Users can request adoption for pets (first-come, first-served rule)
  - Admins can approve/reject adoption requests

- **Donations**

  - Secure donation system integrated with **PayPal Sandbox**
  - Admin dashboard to track total funds and individual donations

- **Admin Features**
  - Manage pets (add, update, delete)
  - Manage users (promote/demote, delete)
  - View adoption trends and donation reports

---

## 🗄️ Database Design

The system uses a hybrid database design:

- **MongoDB (via Mongoose)**
  - Users, Pets, Adoptions, Donations, Categories

### MongoDB Schema (Entity-style)

```text
User
- _id (PK)
- firstName, lastName, email (unique), phone, address
- password (hashed, bcryptjs)
- role (user/admin)
- lastLogin, timestamps

Pet
- _id (PK)
- name, age, breed, gender, color, description
- image, additionalImages [ ]
- traits [ ]
- category_id (ref -> Category)
- status (available, adopted, pending)

Adoption
- _id (PK)
- pet_id (ref -> Pet)
- user_id (ref -> User)
- adoptionStatus (pending, approved, rejected)
- message, timestamps

Donation
- _id (PK)
- user_id (ref -> User)
- email
- amount, currency
- paypalOrderId
- status (completed/failed)
- timestamps

Category
- _id (PK)
- name (Dog, Cat, Other)
```

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Redux Toolkit, Axios, SweetAlert2, Recharts
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Authentication & Security:** JWT (jsonwebtoken), bcryptjs, role-based access control
- **Payments:** PayPal REST API integration
- **Emails:** Gmail SMTP with Nodemailer
- **Build & Dev Tools:** npm, concurrently, nodemon

---

## ⚡ Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local instance at `mongodb://localhost:27017/Pawsitive-Home`)
- PayPal Developer account (Sandbox keys)
- Gmail account (App password for SMTP)

### Steps to Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/agthuhein/Pawsitive-Homes.git
   cd Pawsitive-Homes
   ```

2. **Configure environment variables**  
   Create a `.env` file inside `server/` with:

   ```env
   MONGODB_URI=mongodb://localhost:27017/Pawsitive-Home

   # Gmail SMTP
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your_gmail_account@gmail.com
   SMTP_PASS=your_app_password
   MAIL_FROM="Pawsitive Home <your_gmail_account@gmail.com>"

   # PayPal Sandbox
   PAYPAL_CLIENT_ID=your_sandbox_client_id
   PAYPAL_CLIENT_SECRET=your_sandbox_secret
   PAYPAL_MODE=sandbox

   FRONTEND_URL=http://localhost:3000
   ```

   In `client/.env`:

   ```env
   REACT_APP_PAYPAL_CLIENT_ID=your_sandbox_client_id
   ```

3. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

4. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

5. **Seed the database (optional)**

   ```bash
   cd ..
   npm run seed
   ```

6. **Run the application**
   ```bash
   npm run dev
   ```
   - Backend runs on `http://localhost:4000`
   - Frontend runs on `http://localhost:3000`

---

## 📸 Screenshots

Screenshots of both **User Interface** and **Admin Interface** are available in the documentation/report.

---

## 🚀 Future Improvements

- Admin UI for category management
- Additional payment methods (Stripe, credit card, etc.)
- Expansion to multiple cities/countries with Google Maps API integration
- User’s “Favorite Pets” feature
- Native mobile app (React Native or Flutter)
- Notification system (SMS, push notifications)

---

## 📂 Repository & Demo

- **GitHub Repository:** [Pawsitive Homes](https://github.com/agthuhein/Pawsitive-Homes.git)
- **Demo Video:** [OneDrive Link](https://1drv.ms/v/c/acea0ced7b310c13/EV8Po_ppNbpLpEQwVV9wtWQBsFzUSYfF1Z3ic-oJUZJawA?e=YLGlnB)
