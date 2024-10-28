import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.scss']
})
export class DetalleEventoComponent {
  constructor(
    public dialogRef: MatDialogRef<DetalleEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento,
    private router: Router
  ) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  irAEditar(): void {
    this.dialogRef.close();
    this.router.navigate([`/edit/${this.data.id}`]);
  }

  irACompra(): void {
    this.dialogRef.close();
    this.router.navigate([`/compra/${this.data.id}`]);
  }
}
