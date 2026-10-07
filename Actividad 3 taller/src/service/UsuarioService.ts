import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
    private repository = new UsuarioRepository();

    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    async agregar(usuario: Usuario): Promise<void> {
        const usuarios = await this.repository.obtenerUsuarios();

        const existe = usuarios.some(u => u.id === usuario.id);

        if (existe) {
            throw new Error("Ya existe un usuario con ese ID.");
        }

        usuarios.push(usuario);

        await this.repository.guardarUsuarios(usuarios);
    }

        async actualizar(id: number, nuevosDatos: Partial<Usuario>): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const indice = usuarios.findIndex(u => u.id === id);

            if (indice === -1) {
                throw new Error("El usuario no existe.");
            }
            usuarios[indice] = { ...usuarios[indice], ...nuevosDatos, id };

            await this.repository.guardarUsuarios(usuarios);

            console.log("Usuario Actualizado.");
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const nuevos = usuarios.filter(u => u.id !== id);

            if (nuevos.length === usuarios.length) {
                false;
            }

            await this.repository.guardarUsuarios(nuevos);

            console.log("Usuario eliminado.");
        } catch (error) {
            console.log("Error al eliminar.");
        }
    }
}