class GeneroDuplicadoError extends Error {
    constructor(nombre) {
        super(`El género "${nombre}" ya existe`);
        this.code = 409;
    }
}

export { GeneroDuplicadoError };
