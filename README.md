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
                +-------------------+
                |       User        |
                |-------------------|
                | _id (PK)          |
                | firstName         |
                | lastName          |
                | email (unique)    |
                | phone             |
                | address           |
                | password          |
                | role [user/admin] |
                | lastLogin         |
                +-------------------+
                   ^            ^
                   | user       | user
                   |            |
   +-------------------+   +-------------------+
   |     Donation      |   |     Adoption      |
   |-------------------|   |-------------------|
   | _id (PK)          |   | _id (PK)          |
   | user_id (ref) ----+   | pet_id (ref)      |
   | email             |   | user_id (ref) ----+
   | amount            |   | firstName, email  |
   | currency          |   | address, phone    |
   | paypalOrderId     |   | message           |
   | status            |   | status            |
   +-------------------+   +-------------------+
                                 |
                                 | pet
                                 v
                        +-------------------+
                        |        Pet        |
                        |-------------------|
                        | _id (PK)          |
                        | name, age, color  |
                        | description       |
                        | breed, gender     |
                        | image(s)          |
                        | traits [ ]        |
                        | status            |
                        | category_id (ref)-+----> +-------------------+
                        | timestamps        |      |     Category      |
                        +-------------------+      |-------------------|
                                                   | _id (PK)          |
                                                   | name (unique)     |
                                                   +-------------------+
```
