import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompraService } from '../../services/compra.service';
import { Evento } from '../../models/evento';

@Component({
  selector: 'compra',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent {
  compraItem: any = {
    evento: null,
    correoTitular: '',
    nombreTitular: '',
    numeroTarjeta: '',
    mesCaducidad: 0,
    yearCaducidad: 0,
    cvv: '',
    emisor: ''
  };

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

    private router: Router,
    private compraService: CompraService,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService // Inyectar el servicio de manejo de errores
  ) { }

  ngOnInit(): void {
    this.loadEvento();
  }

  async compra() {
    try {
      this.compraItem.evento = this.evento;
      console.log(this.compraItem)
      const response = await this.compraService.compra(this.compraItem).toPromise();
      console.log('Compra realizada con exito', response);

      this.router.navigate(['/list']);
    } catch (error: unknown) {
      console.error('Error al comprar entrada:', error);

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
