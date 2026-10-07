import  ProductoRepository  from "../repository/ProductoRepository";
import { Producto } from "../models/Producto";

export class ProductoService{

    private repository = new ProductoRepository(); 

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }


    async agregar(producto: Producto): Promise<void> {
        const productos = await this.repository.obtenerProductos();

        const existe = productos.some(p => p.id === producto.id);

        if (existe) {
            throw new Error("Ya existe un producto con ese ID.");
        }

        productos.push(producto);

        await this.repository.guardarProductos(productos);
    }

async actualizar(id: number, nuevosDatos: Partial<Producto>): Promise<void> {
    const productos = await this.repository.obtenerProductos();
    const index = productos.findIndex(p => p.id === id);

    if (index === -1) {
        throw new Error("Producto no encontrado.");
    }

    productos[index] = { ...productos[index], ...nuevosDatos, id }; 

    await this.repository.guardarProductos(productos);
}

    async eliminar(id: number): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();

            const nuevos = productos.filter(p => p.id !== id);

            if (nuevos.length === productos.length) {
                false;
            }

            await this.repository.guardarProductos(nuevos);

            console.log("Producto eliminado.");
        } catch (error) {
            console.log("Error al eliminar.");
        }
    }














































}