import express from "express";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostByid,
  getUserWithPosts,
  postPagination,
  searchPost,
  updatePostById,
} from "../Controller/PostController.js";
import { fetchPosts } from "../Controller/CommentController.js";

const router = express.Router();

router.route("/createpost").post(createPost);
router.route("/getallposts").get(getAllPosts);
//search post by title
router.route("/search").get(searchPost)
router.route("/getpostbyid/:id").get(getPostByid);

//get user with post 
router.route("/getuserwithpost").get(getUserWithPosts)

//fetch posts with comment
router.route("/fetchposts").get(fetchPosts)

router.route("/updatepost/:id").put(updatePostById);
router.route("/deletepost/:id").delete(deletePostById);
//pagination

router.route("/page").get(postPagination)



export default router;
