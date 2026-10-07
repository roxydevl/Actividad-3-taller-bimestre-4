import { createServer } from "http";
import { routes as usuarioRoutes  } from "../router/UsuarioRouter";
import { routes as productoRoutes } from "../router/ProductosRouter";

const servidor = createServer(async (req, res) => {
    const url = req.url ?? "";

    if (url.startsWith("/usuarios")) {
        await usuarioRoutes(req, res);
        return;
    }

    if (url.startsWith("/productos")) {
        await productoRoutes(req, res); 
        return;
    }
    
});

servidor.listen(3000, () => {
    console.log("----------------------");
    console.log("Servidor iniciado en:");
    console.log("http://localhost:3000");
    console.log("----------------------");
});