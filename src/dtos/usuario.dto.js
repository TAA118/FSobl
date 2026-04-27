const usuarioDto = (usuario) => {
    return {
        id: usuario._id,
        nombreUsuario: usuario.nombreUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        mail: usuario.mail,
        rol: usuario.rol,
        plan: usuario.plan,
        createdAt: usuario.createdAt
    }
}

export { usuarioDto }