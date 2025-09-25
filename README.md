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

User

- \_id (PK)
- firstName, lastName, email (unique), phone, address
- password (hashed, bcryptjs)
- role (user/admin)
- lastLogin, timestamps

Pet

- \_id (PK)
- name, age, breed, gender, color, description
- image, additionalImages [ ]
- traits [ ]
- category_id (ref -> Category)
- status (available, adopted, pending)

Adoption

- \_id (PK)
- pet_id (ref -> Pet)
- user_id (ref -> User)
- adoptionStatus (pending, approved, rejected)
- message, timestamps

Donation

- \_id (PK)
- user_id (ref -> User)
- email
- amount, currency
- paypalOrderId
- status (completed/failed)
- timestamps

Category

- \_id (PK)
- name (Dog, Cat, Other)

```

```
