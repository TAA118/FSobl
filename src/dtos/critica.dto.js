const criticaDTO = (critica) => {
    return {
        id: critica._id,
        puntaje: critica.puntaje,
        comentario: critica.comentario,
        usuario: {
            id: critica.idUsuario._id,
            nombre: critica.idUsuario.nombre,
            nombreUsuario: critica.idUsuario.nombreUsuario
        },
        libro: {
            id: critica.idLibro._id,
            titulo: critica.idLibro.titulo,
            autor: critica.idLibro.autor
        },
        createdAt: critica.createdAt
    };
};

export { criticaDTO };
