import { Router } from "express";
import auth from "../middlewares/auth";
import {
  createUser,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/User";
import role from "../middlewares/role";

const router = Router();

router
  .get("/", auth, getUsers)
  .get("/me", auth, getUser)
  .post("/", createUser)
  .patch("/:email", auth, role(["admin"]), updateUser)
  .post("/login", loginUser)
  .get("/logout", auth, logoutUser);

export default router;
