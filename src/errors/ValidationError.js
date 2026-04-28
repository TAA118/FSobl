class ValidationError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.code = 400;
    }
}

export { ValidationError };
