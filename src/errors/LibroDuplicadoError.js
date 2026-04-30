class LibroDuplicadoError extends Error {
    constructor(titulo) {
        super(`El libro "${titulo}" ya existe`);
        this.code = 409;
    }
}

export { LibroDuplicadoError };
