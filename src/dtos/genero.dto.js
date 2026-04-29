const generoDTO = (genero) => {
    return {
        id: genero._id,
        nombre: genero.nombre,
        createdAt: genero.createdAt
    };
};

export { generoDTO };
