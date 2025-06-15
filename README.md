# 📘 prisma-express-postgres-api

A production-ready **RESTful API backend** built with **Node.js**, **Express.js**, **Prisma ORM**, and **PostgreSQL**. This project showcases a fully functional relational database structure involving **Users**, **Posts**, and **Comments**, including features like cascade deletes, comment counts, and timestamps.

---

## 🚀 Features

- 🔐 User registration & authentication (optional)
- 📝 Users can create posts and write comments
- 💬 Nested relationships: User → Post → Comment
- 🔄 CRUD operations for all models
- 🧹 Cascading deletes handled at DB level
- 🔎 API filtering & sorting with Prisma queries
- 📄 Swagger documentation included
- 🧪 Postman/ThunderClient testing supported
- 🧠 Designed with best practices in mind

---

## 🛠️ Tech Stack

| Technology   | Description                              |
|--------------|------------------------------------------|
| Node.js      | JavaScript runtime for server-side logic |
| Express.js   | Web framework for building APIs          |
| Prisma ORM   | Type-safe ORM for PostgreSQL             |
| PostgreSQL   | Relational database                      |
| dotenv       | Manage environment variables             |
| Swagger      | API documentation                        |

---

## 🧩 Prisma Schema

```prisma
model User {
  id         Int       @id @default(autoincrement())
  name       String?
  email      String    @unique
  password   String?
  post       Post[]
  comment    Comment[]
  created_at DateTime  @default(now())
}

model Post {
  id            Int       @id @default(autoincrement())
  user_id       Int
  user          User      @relation(fields: [user_id], references: [id], onDelete: Cascade)
  title         String
  description   String
  comment       Comment[]
  comment_count BigInt    @default(0)
  created_at    DateTime  @default(now())
}

model Comment {
  id         String    @id @default(uuid())
  post_id    Int
  user_id    Int
  comment    String
  post       Post      @relation(fields: [post_id], references: [id], onDelete: Cascade)
  user       User      @relation(fields: [user_id], references: [id], onDelete: Cascade)
  created_at DateTime  @default(now())
}
