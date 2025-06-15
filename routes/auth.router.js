import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../Controller/UserController.js";

const router = express.Router();

router.route("/createuser").post(createUser);
router.route("/getalluser").get(getAllUser);
router.route("/getuser/:id").get(getUserById);
router.route("/updateuser/:id").put(updateUser);
router.route("/deleteuser/:id").delete(deleteUser);
export default router;
