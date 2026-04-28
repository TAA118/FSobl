class LibroNoEncontradoError extends Error {
    constructor() {
        super("libro no encontrado");
        this.code = 404;
    }
}

export { LibroNoEncontradoError };
