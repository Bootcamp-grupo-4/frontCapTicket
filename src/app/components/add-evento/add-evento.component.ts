import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { EventoService } from '../../services/evento.service';  // Importa el servicio EventoService
import { Router } from '@angular/router';  // Para redirigir después de añadir el evento
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-evento',
  standalone: true,  
  imports: [FormsModule,CommonModule],  
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
    mostrar: true,
    precio: 0,
  };

  errorMessage: string | null = null;

  constructor(private eventoService: EventoService, private router: Router) {}

  async addEvento() {
    try {
      this.evento.precioMaximo = this.evento.precioMinimo;
      
      const response = await this.eventoService.addEvento(this.evento).toPromise();
      console.log('Evento añadido con éxito:', response);
  
      this.router.navigate(['/list']);
    } catch (error) {
      console.error('Error al añadir el evento:', error);
      this.errorMessage = 'Hubo un error al añadir el evento. Inténtalo de nuevo.';
    }
  }
  
}
