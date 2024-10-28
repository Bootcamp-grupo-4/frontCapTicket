import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service'; 
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private errorHandler: ErrorHandlerService // Inyectar el servicio de manejo de errores
  ) {}

  async addEvento() {
    try {
      this.evento.precioMaximo = this.evento.precioMinimo;
  
      const response = await this.eventoService.addEvento(this.evento).toPromise();
      console.log('Evento añadido con éxito:', response);
  
      this.router.navigate(['/list']);
    } catch (error: unknown) {
      console.error('Error al añadir el evento:', error);
  
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = this.errorHandler.getErrorMessage(error);
      } else {
        this.errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      }
    }
  }
  

  goBack() {
    this.router.navigate(['/list']);
  }
}
