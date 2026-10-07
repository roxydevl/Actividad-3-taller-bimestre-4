import { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { UsuarioService } from "../service/UsuarioService";

const service = new UsuarioService();

export async function routes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (metodo === "GET" && url === "/usuarios") {

            const usuarios = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(usuarios));

            return;
        }

        if (metodo === "POST" && url === "/usuarios/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const usuario = JSON.parse(body);

                    await service.agregar(usuario);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Usuario agregado correctamete."
                    }));

                } catch (error) {
                    
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })
        }

        if (metodo === "PUT" && url.startsWith("/usuarios/")) {
            const idStr = url.split("/")[2];
            const id = Number(idStr);

            let body = "";
            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    const datosActualizados = JSON.parse(body);
                    await service.actualizar(id, datosActualizados);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Usuario actualizado correctamente."
                    }));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            });
            return;
        }

        if (metodo === "DELETE" && url.startsWith("/usuarios/")) {
            const idStr = url.split("/")[2];
            const id = Number(idStr);

            try {
                await service.eliminar(id);

                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Usuario eliminado correctamente."
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    mensaje: (error as Error).message
                }));
            }
            return;
        }
        
    } catch (error) {
        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
        
    }
}