import dotenv from "dotenv";
import express from "express";
import MainRouter from "./routes/route.index.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1", MainRouter);
app.get("/", (req, res) => {
  return res.send("REST API using Node.js, Express, Prisma and PostgreSQL");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});
