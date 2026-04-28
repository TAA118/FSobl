class CriticaNoEncontradaError extends Error {
    constructor() {
        super("crítica no encontrada");
        this.code = 404;
    }
}

export { CriticaNoEncontradaError };
