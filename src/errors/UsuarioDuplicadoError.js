class UsuarioDuplicadoError extends Error {
    constructor(campo, valor) {
        super(`El ${campo} "${valor}" ya está registrado`);
        this.code = 409;
    }
}

export { UsuarioDuplicadoError };
