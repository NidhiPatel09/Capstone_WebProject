import { Router } from "express";
import { getUserById } from "../controllers/user/getUserById";

const router = Router();

router.get("/getUserById/:id", getUserById);

export default router;
