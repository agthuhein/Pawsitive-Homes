# 🐾 Pet Adoption & Donation System (MongoDB + Mongoose)

This project is a **Node.js + MongoDB (Mongoose)** backend application for managing **users, pets, adoptions, donations, and categories**.

It provides APIs for:

- User authentication & management
- Pet listing & categorization
- Adoption requests with validation rules
- Donations with PayPal integration
- Category management

---

## 📊 ER Diagram (MongoDB Schema)

```text
+-------------------+            +-------------------+
|       User        |            |      Category     |
|-------------------|            |-------------------|
| _id (PK)          |            | _id (PK)          |
| firstName         |            | name (unique)     |
| lastName          |            +-------------------+
| email (unique)    |
| phone             |
| address           |                ^
| password          |                |
| role [user/admin] |                |
| lastLogin         |                |
+-------------------+                |
         ^                           |
         | user                      |
         |                           |
+-------------------+        +-------------------+
|    Donation       |        |       Pet         |
|-------------------|        |-------------------|
| _id (PK)          |        | _id (PK)          |
| user_id (ref) ----+------> | category_id (ref) |
| email             |        | name, age, color  |
| amount            |        | description       |
| currency          |        | breed, gender     |
| paypalOrderId     |        | image(s)          |
| status            |        | traits [ ]        |
+-------------------+        | status            |
                             +-------------------+
                                      ^
                                      |
                                      | pet
                                      |
                             +-------------------+
                             |     Adoption      |
                             |-------------------|
                             | _id (PK)          |
                             | pet_id (ref) -----+
                             | user_id (ref) ----+
                             | firstName, email  |
                             | address, phone    |
                             | message           |
                             | status            |
                             +-------------------+
```
