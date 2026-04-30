class InvalidIdError extends Error {
    constructor(tipo = "recurso") {
        super(`ID de ${tipo} inválido`);
        this.code = 400;
    }
}

export { InvalidIdError };
