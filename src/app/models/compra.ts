import { Evento } from "./evento";

export class Compra {
    evento!: Evento;
    correoTitular!: string;
    nombreTitular!: string;
    numeroTarjeta!: string;
    mesCaducidad!: number;
    yearCaducidad!: number;
    cvv!: number;
    emisor!: string;

    constructor(init?: Partial<Evento>) {
        Object.assign(this, init);
    }


}