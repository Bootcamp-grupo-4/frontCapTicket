import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-eventos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.scss']
})
export class ListEventosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'fechaEvento', 'precioMinimo', 'precioMaximo', 'localidad', 'acciones'];
  dataSource = new MatTableDataSource<Evento>();
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.loadEventos();
  }

  loadEventos() {
    this.isLoading = true;
    this.eventoService.getEventos().subscribe(
      eventos => {
        this.dataSource.data = eventos;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar los eventos:', error);
        this.errorMessage = 'No se pudieron cargar los eventos. Por favor, inténtelo de nuevo más tarde.'; // Mensaje de error
        this.isLoading = false;
      }
    );
  }
}
