import { Router } from "express";
import { postRegister, postLogin } from "../controllers";

const router = Router();

router.post("/register", postRegister);
router.post("/login", postLogin);

export default router;
