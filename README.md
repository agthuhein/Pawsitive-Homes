# 🐾 Pawsitive Homes – Pet Adoption & Donation System

This project is a **MERN stack (MongoDB, Express, React, Node.js)** application designed to connect users with pets in need of adoption and allow secure donations. The system includes role-based features for **users** and **administrators**, with PayPal donation integration and email notifications.

---

## ✨ Features

- **User Management**

  - Register, log in, and manage profile
  - Update password, forgot password, view adoption requests, and donation history

- **Pet Management**

  - Browse pet gallery with filters (category and gender)
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

The system uses **MongoDB** (via **Mongoose**) as its primary database.  
Data is stored in **collections**, with references to maintain relationships.

### Collections

- **Users**

  - Stores authentication & profile details.
  - Fields: `firstName`, `lastName`, `email`, `password (hashed)`, `role`, `resetPasswordToken`, `resetPasswordExpires`.
  - Relationships: Linked to **Adoptions** and **Donations**.

- **Pets**

  - Stores pet profiles available for adoption.
  - Fields: `name`, `age`, `breed`, `gender`, `color`, `description`, `traits`, `image(s)`, `status`, `category (ref)`.
  - Relationships: Linked to **Adoptions** and **Categories**.

- **Categories**

  - Groups pets (e.g., Dog, Cat).
  - Fields: `name`.
  - Relationships: Linked to **Pets**.

- **Adoptions**

  - Tracks adoption requests.
  - Fields: `user (ref)`, `pet (ref)`, `status`, `message`.
  - Rules: One active request per pet (first-come, first-served).

- **Donations**
  - Tracks user donations.
  - Fields: `user (ref)`, `email`, `amount`, `currency`, `paypalOrderId`, `status`.

---

## 📊 MongoDB Schema (Collection Relationship Diagram)

````text
   +--------+            +-----------+
   |  User  |----------->| Adoption  |
   +--------+            +-----------+
       |                       ^
       |                       |
       v                       |
   +-----------+               |
   | Donation  |               |
   +-----------+               |
                               |
                               v
                          +-----------+
                          |   Pet     |
                          +-----------+
                               |
                               v
                          +-----------+
                          | Category  |
                          +-----------+



## 🚀 Tech Stack

- **Frontend:** React, React Router, Redux Toolkit, Axios, SweetAlert2, Recharts
- **Backend:** Node.js, Express, Mongoose, Multer, Nodemailer, Morgan
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken, bcryptjs, crypto)
- **Payments:** PayPal Sandbox API
- **Email:** Gmail SMTP (via Nodemailer)

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (running locally or Atlas)
- PayPal Sandbox account
- Gmail account with App Password enabled

### Steps

```bash
# 1. Clone repository
git clone https://github.com/agthuhein/Pawsitive-Homes.git
cd Pawsitive-Homes

# 2. Configure environment
# Create server/.env and client/.env (see .env.example below)

# 3. Install dependencies
cd server
npm install
cd ../client
npm install
cd ..

# 4. (Optional) Seed initial data
npm run seed

# 5. Run the app (server + client concurrently)
npm run dev
````

App will run at:

- Backend → `http://localhost:4000`
- Frontend → `http://localhost:3000`

---

## 🔑 Environment Variables

### server/.env

```env
MONGODB_URI=mongodb://localhost:27017/Pawsitive-Home

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM="Pawsitive Home <your_email@gmail.com>"

# PayPal Sandbox
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_secret
PAYPAL_MODE=sandbox

FRONTEND_URL=http://localhost:3000
```

### client/.env

```env
REACT_APP_PAYPAL_CLIENT_ID=your_sandbox_client_id
```

---

## 📺 Demo & Resources

- **GitHub Repo:** [Pawsitive Homes](https://github.com/agthuhein/Pawsitive-Homes.git)
- **Demo Video (OneDrive):** [Watch Here](https://1drv.ms/v/c/acea0ced7b310c13/EV8Po_ppNbpLpEQwVV9wtWQBsFzUSYfF1Z3ic-oJUZJawA?e=YLGlnB)

---

## ✅ Future Improvements

- Add Category management UI for Admin.
- Support multiple payment methods (e.g., Stripe).
- Expand to multiple cities/countries with Google Maps API integration.
- Add “Favorite Pets” feature for users.
- Mobile App version for Android/iOS.

---

## 📌 License

Developed by **Aung Thu Hein**.
