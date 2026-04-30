class GeneroNoEncontradoError extends Error {
    constructor() {
        super("género no encontrado");
        this.code = 404;
    }
}

export { GeneroNoEncontradoError };
