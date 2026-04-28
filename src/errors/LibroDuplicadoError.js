class LibroDuplicadoError extends Error {
    constructor(isbn) {
        super(`El libro con ISBN ${isbn} ya existe`);
        this.code = 409;
    }
}

export { LibroDuplicadoError };
