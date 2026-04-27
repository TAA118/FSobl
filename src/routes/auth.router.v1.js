import express from "express"
import { login, registrar, cambiarPlan } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/registrar', registrar)
authRouter.put('/plan', authMiddleware, cambiarPlan)

export { authRouter }