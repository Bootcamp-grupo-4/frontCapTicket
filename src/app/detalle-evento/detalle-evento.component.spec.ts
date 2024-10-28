import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleEventoComponent } from './detalle-evento.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Evento } from '../models/evento';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

describe('DetalleEventoComponent', () => {
  let component: DetalleEventoComponent;
  let fixture: ComponentFixture<DetalleEventoComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DetalleEventoComponent>>;
  let router: jasmine.SpyObj<Router>;

  const mockEvento: Evento = {
    id: 1,
    nombre: 'Concierto de Rock',
    descripcion: 'Un concierto espectacular con las mejores bandas.',
    fechaEvento: new Date('2024-11-15'),
    precio: 75.00,
    precioMinimo: 50.00,
    precioMaximo: 100.00,
    localidad: 'Madrid',
    nombreDelRecinto: 'Wanda Metropolitano',
    genero: 'Música',
    mostrar: true,
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        DetalleEventoComponent,
        CommonModule,
        MatButtonModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockEvento },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleEventoComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cerrar el diálogo al llamar a cerrar()', () => {
    component.cerrar();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('debe navegar a la página de edición al llamar a irAEditar()', () => {
    component.irAEditar();
    expect(dialogRef.close).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([`/edit/${mockEvento.id}`]);
  });
  
});
