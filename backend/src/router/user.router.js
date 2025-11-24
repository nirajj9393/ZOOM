import { Router } from "express";
import { login, register, logout } from "../controller/user.controller.js";
import { protect } from "../middleware/protect.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout",logout);

router.post("/add_to_activity", (req, res) => {
  res.send("Add activity route - not implemented yet");
});

router.get("/get_all_activity", (req, res) => {
  res.send("Get all activities route - not implemented yet");
});

export default router;
