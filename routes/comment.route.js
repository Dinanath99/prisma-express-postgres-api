import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  updateCommentById,
} from "../Controller/CommentController.js";

const router = Router();

router.route("/createcomment").post(createComment);
router.route("/getallcomments").get(getAllComments);
router.route("/getcommentbyid/:id").get(getCommentById);
router.route("/updatecomment/:id").put(updateCommentById);
router.route("/deletecomment/:id").delete(deleteCommentById);

export default router;
