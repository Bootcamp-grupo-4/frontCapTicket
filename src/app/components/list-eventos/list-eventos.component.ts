import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ConfirmDeleteDialogComponent } from '../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { DetalleEventoComponent } from '../detalle-evento/detalle-evento.component';

@Component({
  selector: 'app-list-eventos',
  standalone: true,
  imports: [CommonModule, MatSortModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule, MatSort],
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.scss']
})
export class ListEventosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'fechaEvento', 'precio', 'localidad', 'acciones'];
  dataSource = new MatTableDataSource<Evento>();
  isLoading = true;
  errorMessage: string | null = null;

  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    private eventoService: EventoService,
    private errorHandler: ErrorHandlerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEventos();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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

  //* Método para eliminar un evento
  deleteEvento(id: number, nombre: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { name: nombre } // Pasar el nombre del evento al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventoService.deleteEvento(id).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(evento => evento.id !== id);
          },
          (error: HttpErrorResponse) => {
            console.error('Error al eliminar el evento:', error);
            this.errorMessage = this.errorHandler.getErrorMessage(error);
          }
        );
      }
    });
  }

  openEventoDetails(id: string): void {
    this.eventoService.getEventoById(id).subscribe(
      (evento) => {
        this.dialog.open(DetalleEventoComponent, {
          width: '400px',
          data: evento
        });
      },
      (error) => {
        console.error('Error al cargar el evento', error);
      }
    );
  }
}
