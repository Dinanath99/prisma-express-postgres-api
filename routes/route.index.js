import express from "express";
import authRouter from "../routes/auth.router.js";
import commentRouter from "../routes/comment.route.js";
import postRouter from "../routes/post.route.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
export default router;
