import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Usuario } from "../modelos/user.model.js"
import { usuarioDto } from "../dtos/usuario.dto.js"

const doLogin = async ({ usuario, pass }) => {
    const u = await Usuario.findOne({ nombreUsuario: usuario }) // query de busqueda
    if (u) {
        const esValida = await bcrypt.compare(pass, u.contrasena)
        if (esValida) {
            const token = jwt.sign(
                { idUsu: u.id, rolUsu: u.rol },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            return { token }
        }
    }

    throw new Error("no autorizado");
}

const registrarUsuario = async ({ nombreUsuario, nombre, apellido, contrasena, mail, rol, plan }) => {
    const contraHasheada = await bcrypt.hash(contrasena, 10);

    const rolUsuario = rol || "usuario";
    let planUsuario;
    if (rolUsuario === "cliente") {
        planUsuario = plan === "premium" ? "premium" : "plus";
    }

    const nuevoUsuario = {
        nombreUsuario,
        nombre,
        apellido,
        contrasena: contraHasheada,
        mail,
        rol: rolUsuario,
        plan: planUsuario
    };

    const usuarioGuardado = await Usuario.create(nuevoUsuario);
    const usuarioDTO = usuarioDto(usuarioGuardado);
    return usuarioDTO;
}

const actualizarPlanCliente = async (idUsu, nuevoPlan = "premium") => {
    const planDeseado = nuevoPlan === "premium" ? "premium" : "plus";

    const usuario = await Usuario.findById(idUsu);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    if (usuario.rol !== "cliente") {
        throw new Error("Solo usuarios con rol cliente pueden cambiar de plan");
    }

    if (usuario.plan === "premium") {
        return usuario;
    }

    if (usuario.plan === "plus" && planDeseado === "premium") {
        usuario.plan = "premium";
        await usuario.save();
        return usuario;
    }

    throw new Error("Solo se puede actualizar de plan plus a premium");
}

export { doLogin, registrarUsuario, actualizarPlanCliente }