import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => { 
    const authHeader = req.headers.authorization

    if (!authHeader) { 
        res.status(401).json({ message: "Token no enviado" })
        return
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ message: "Formato de token inválido" })
        return
    }

    const token = parts[1]

    try {
        const tokenUsu = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.idUsu = tokenUsu.idUsu
        req.rolUsu = tokenUsu.rolUsu
        next()
        console.log("contenido token:", tokenUsu)
    } catch (e) {
        console.log("token inválido")
        res.status(401).json({ message: "Token inválido" })
    }
}

export { authMiddleware }