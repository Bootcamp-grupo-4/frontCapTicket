import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-add-evento',
  standalone: true,  // Declaramos el componente como standalone
  imports: [FormsModule],  // Importa FormsModule aquí
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss']
})
export class AddEventoComponent {
  evento: any = {
    nombre: '',
    descripcion: '',
    fechaEvento: '',
    precioMinimo: 0,
    precioMaximo: 0,
    localidad: '',
    nombreDelRecinto: '',
    genero: '',
    mostrar: true
  };

  generos: string[] = ['Música', 'Deporte', 'Teatro', 'Conferencia'];

  addEvento() {
    console.log(this.evento); // Lógica para manejar el evento añadido
  }
}
