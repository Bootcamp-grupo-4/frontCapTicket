export class Evento {
    id?: number;
    nombre!: string;
    descripcion!: string;
    fechaEvento!: Date;
    precioMinimo!: number;
    precioMaximo!: number;
    localidad!: string;
    nombreDelRecinto!: string;
    genero!: string;
    mostrar!: boolean;
  
    constructor(init?: Partial<Evento>) {
      Object.assign(this, init);
    }
  }
  