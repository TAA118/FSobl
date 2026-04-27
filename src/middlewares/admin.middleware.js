const adminMiddleware = (req, res, next) => {
    if (req.rolUsu !== "admin") {
        res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador." });
        return;
    }

    next();
};

export { adminMiddleware };
