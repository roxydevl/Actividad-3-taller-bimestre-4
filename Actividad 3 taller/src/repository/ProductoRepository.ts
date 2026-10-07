import { readFile, writeFile } from "fs/promises"; 
import { Producto } from "../models/Producto";


export default class ProductoRepository{

    private ruta = "./src/data/productos.json";

    async obtenerProductos(): Promise<Producto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");

            return JSON.parse(datos);            
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    async guardarProductos(producto: Producto[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(producto, null, 4)
            );

        } catch (error) {
            console.log(error);
        }
    }


}   
    
