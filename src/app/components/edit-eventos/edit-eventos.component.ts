import { Component, OnInit } from '@angular/core';
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

  eventoToEdit: any = {
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

      const response = await this.eventoService.addEvento(this.evento).toPromise();
      console.log('Evento editado con éxito:', response);

      this.router.navigate(['/list']);
    } catch (error) {
      console.error('Error al añadir el evento:', error);
      this.errorMessage = 'Hubo un error al añadir el evento. Inténtalo de nuevo.';
    }
  }

  loadEvento() {
    let id = this.route.snapshot.paramMap.get("id");
    console.log(typeof id)
  }


}
