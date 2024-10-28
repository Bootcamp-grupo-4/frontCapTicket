import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../services/error-handler.service'; // Asegúrate de importar el servicio
import { RouterModule } from '@angular/router'
@Component({
  selector: 'app-list-eventos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.scss']
})
export class ListEventosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'fechaEvento', 'precioMinimo', 'precioMaximo' , 'precio' , 'localidad', 'acciones'];
  dataSource = new MatTableDataSource<Evento>();
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private eventoService: EventoService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadEventos();
  }

  loadEventos() {
    this.isLoading = true;
    this.eventoService.getEventos().subscribe(
      (eventos: Evento[]) => {
        this.dataSource.data = eventos;
        this.isLoading = false;
        
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar los eventos:', error);
        this.errorMessage = this.errorHandler.getErrorMessage(error);
        this.isLoading = false;
      }
    );
  }
}
