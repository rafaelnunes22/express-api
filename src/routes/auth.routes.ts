import { Router } from "express";
import { register, login } from "../controllers/auth.controller.ts";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);

export { router as authRoutes };
