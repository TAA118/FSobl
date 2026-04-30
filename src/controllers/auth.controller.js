//controlador de inicio de sesion

import { doLogin, registrarUsuario, actualizarPlanCliente, obtenerUsuarios } from "../services/auth.service.v1.js";
import { usuarioDto } from "../dtos/usuario.dto.js";

const login = async (req, res) => {
    try {
        const token = await doLogin(req.body);
        res.status(200).json(token);
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
};

const registrar = async (req, res) => {
    try {
        console.log("registrando usuario...");
        const usuarioNuevo = await registrarUsuario(req.body);
        res.status(201).json(usuarioNuevo);
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message });
    }
};

const cambiarPlan = async (req, res) => {
    try {
        const usuarioActualizado = await actualizarPlanCliente(req.idUsu, req.body.plan);
        res.status(200).json(usuarioDto(usuarioActualizado));
    } catch (e) {
        const mensaje = e.message || "Error al cambiar el plan";
        res.status(400).json({ message: mensaje });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export { login, registrar, cambiarPlan, logout, getUsuarios }