class NotaNoEncontradaError extends Error {
    constructor() {
        super("nota no encontrada"),
        this.code = 404
    }
}

export { NotaNoEncontradaError }