import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddEventoComponent } from './add-evento.component';  // Es un componente standalone
import { EventoService } from '../../services/evento.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Evento } from '../../models/evento';

describe('AddEventoComponent', () => {
  let component: AddEventoComponent;
  let fixture: ComponentFixture<AddEventoComponent>;
  let eventoService: jasmine.SpyObj<EventoService>;
  let router: jasmine.SpyObj<Router>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const eventoServiceMock = jasmine.createSpyObj('EventoService', ['addEvento']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AddEventoComponent, FormsModule],  
      providers: [
        { provide: EventoService, useValue: eventoServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventoComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService) as jasmine.SpyObj<EventoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    debugElement = fixture.debugElement;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a addEvento y navegar en caso de éxito', async () => {
    const mockEvento: Evento = {
      nombre: 'Evento de prueba',
      descripcion: 'Descripción de prueba',
      fechaEvento: new Date('2024-10-01'),
      precioMinimo: 10,
      precioMaximo: 50,
      localidad: 'Avilés',
      nombreDelRecinto: 'Recinto Deportivo',
      genero: 'Concierto',
      mostrar: true,
      precio: 10,
    };

    eventoService.addEvento.and.returnValue(of(mockEvento));

    await component.addEvento();

    expect(eventoService.addEvento).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('debería manejar el error y mostrar un mensaje de error', async () => {
    const errorMessage = 'Error al añadir el evento';
    eventoService.addEvento.and.returnValue(throwError(() => new Error(errorMessage)));

    await component.addEvento();

    expect(eventoService.addEvento).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Ocurrió un error inesperado. Inténtalo de nuevo.');
  });

  it('debería mostrar un error de validación cuando el formulario es inválido', async () => {
    component.evento.nombre = '';
    component.evento.descripcion = 'Descripción válida';

    await component.addEvento();

    expect(component.errorMessage).toEqual('Ocurrió un error inesperado. Inténtalo de nuevo.');
  });

  it('debería mostrar el botón de volver atrás y navegar cuando se hace clic', () => {
    const backButton = debugElement.query(By.css('button[color="warn"]'));
    backButton.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });
});
