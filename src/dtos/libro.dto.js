const libroDTO = (libro) => {
    return {
        id: libro._id,
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        fecha: libro.fecha,
        imagenURL: libro.imagenURL,
        sinopsis: libro.sinopsis,
        createdAt: libro.createdAt
    };
};

export { libroDTO };
