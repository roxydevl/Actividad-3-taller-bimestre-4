import promptSync from "prompt-sync";

const prompt = promptSync();

export class Ejercicio1 {
    saludo(): void {
        const nombre: string = prompt("Ingrese su nombre: ");
        console.log(`Hola ${nombre} bienvenido al primer programa con TypeScript.`);
    }
}