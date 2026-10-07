import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "../service/ProductoService";

const service = new ProductoService();

export async function routes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        if (metodo === "GET" && url === "/productos") {

            const productos = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(productos));

            return;
        }

        if (metodo === "POST" && url === "/productos/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const producto = JSON.parse(body);

                    await service.agregar(producto);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "producto agregado correctamete."
                    }));

                } catch (error) {
                    
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })
        }

        if (metodo === "PUT" && url.startsWith("/productos/actualizar")) {
            const idStr = url.split("/")[3];
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
                        mensaje: "Producto actualizado correctamente."
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


        if (metodo === "DELETE" && url.startsWith("/productos/eliminar")) {
            const idStr = url.split("/")[3];
            const id = Number(idStr);

            try {
                await service.eliminar(id);

                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Producto eliminado correctamente."
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    mensaje: (error as Error).message
                }));
            }
            return;
        }
        
    }     catch (error) {
        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
        
       }
}