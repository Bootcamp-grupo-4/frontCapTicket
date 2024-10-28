import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditEventosComponent } from './edit-eventos.component';  // Es un componente standalone
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Evento } from '../../models/evento';

describe('EditEventosComponent', () => {
  let component: EditEventosComponent;
  let fixture: ComponentFixture<EditEventosComponent>;
  let eventoService: jasmine.SpyObj<EventoService>;
  let router: jasmine.SpyObj<Router>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const eventoServiceMock = jasmine.createSpyObj('EventoService', ['editEvento']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EditEventosComponent, FormsModule],  
      providers: [
        {   provide: EventoService, useValue: eventoServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute,
            useValue: {
              snapshot: {
                  paramMap: {
                  get: (key: string) => key === 'id' ? '1' : null
                  }
              }
            }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEventosComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService) as jasmine.SpyObj<EventoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    debugElement = fixture.debugElement;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a editEvento y navegar en caso de éxito', async () => {
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

    eventoService.editEvento.and.returnValue(of(mockEvento));

    await component.editEvento();

    expect(eventoService.editEvento).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('debería manejar el error y mostrar un mensaje de error', async () => {
    const errorMessage = 'Error al editar el evento';
    eventoService.editEvento.and.returnValue(throwError(() => new Error(errorMessage)));

    await component.editEvento();

    expect(eventoService.editEvento).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Ocurrió un error inesperado. Inténtalo de nuevo.');
  });

  it('debería mostrar un error de validación cuando el formulario es inválido', async () => {
    component.evento.nombre = '';
    component.evento.descripcion = 'Descripción válida';

    await component.editEvento();

    expect(component.errorMessage).toEqual('Ocurrió un error inesperado. Inténtalo de nuevo.');
  });

  it('debería mostrar el botón de volver atrás y navegar cuando se hace clic', () => {
    const backButton = debugElement.query(By.css('button[color="warn"]'));
    backButton.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });
});
