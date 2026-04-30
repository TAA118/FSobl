import express from "express"
import { login, registrar, cambiarPlan, logout, getUsuarios } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/registrar', registrar)
authRouter.post('/logout', authMiddleware, logout)
authRouter.put('/plan', authMiddleware, cambiarPlan)
authRouter.get('/usuarios', authMiddleware, adminMiddleware, getUsuarios)

export { authRouter }