import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';  // Para redirigir después de añadir el evento
import { ErrorHandlerService } from '../../services/error-handler.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-edit-eventos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-eventos.component.html',
  styleUrls: ['./edit-eventos.component.scss']
})
export class EditEventosComponent implements OnInit {
  errorMessage: string | null = null;

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

  constructor(
    private eventoService: EventoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEvento();
  }

  async editEvento() {
    try {
      this.evento.precioMaximo = this.evento.precioMinimo;

      const response = await this.eventoService.editEvento(this.evento).toPromise();
      console.log('Evento editado con éxito:', response);
      this.router.navigate(['/list']);
    } catch (error) {
      console.error('Error al editar el evento:', error);
      if (error instanceof HttpErrorResponse) {
        this.errorMessage = this.errorHandler.getErrorMessage(error);
      } else {
        this.errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      }
    }
  }

  loadEvento() {
    let id: string = this.getId()
    this.eventoService.getEventoById(id).subscribe(
      (evento: Evento) => {
        if (evento) {
          this.evento = evento
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar el evento:', error);
        this.errorMessage = this.errorHandler.getErrorMessage(error);
      });
  }

  getId(): string {
    let idget = this.route.snapshot.paramMap.get("id");
    let id: string = "";
    if (idget) {
      id = idget;
    }
    return id;
  }

  goBack() {
    this.router.navigate(['/list']);
  }

}
