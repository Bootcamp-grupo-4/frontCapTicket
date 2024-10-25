import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEventosComponent } from './list-eventos.component';
import { EventoService } from '../../services/evento.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Evento } from '../../models/evento';

describe('ListEventosComponent', () => {
  let component: ListEventosComponent;
  let fixture: ComponentFixture<ListEventosComponent>;
  let eventoService: jasmine.SpyObj<EventoService>;
  let errorHandler: jasmine.SpyObj<ErrorHandlerService>;

  beforeEach(async () => {
    const eventoServiceMock = jasmine.createSpyObj('EventoService', ['getEventos']);
    const errorHandlerMock = jasmine.createSpyObj('ErrorHandlerService', ['getErrorMessage']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: EventoService, useValue: eventoServiceMock },
        { provide: ErrorHandlerService, useValue: errorHandlerMock },
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ListEventosComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService) as jasmine.SpyObj<EventoService>;
    errorHandler = TestBed.inject(ErrorHandlerService) as jasmine.SpyObj<ErrorHandlerService>;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar eventos en ngOnInit', () => {
    const mockEventos: Evento[] = [
      { 
        id: 1, 
        nombre: 'Evento 1', 
        descripcion: 'Descripción del evento 1', 
        fechaEvento: new Date(), 
        precioMinimo: 10, 
        precioMaximo: 20, 
        localidad: 'Ciudad A', 
        nombreDelRecinto: 'Recinto A', 
        genero: 'Rock', 
        mostrar: true 
      },
      { 
        id: 2, 
        nombre: 'Evento 2', 
        descripcion: 'Descripción del evento 2', 
        fechaEvento: new Date(), 
        precioMinimo: 15, 
        precioMaximo: 25, 
        localidad: 'Ciudad B', 
        nombreDelRecinto: 'Recinto B', 
        genero: 'Pop', 
        mostrar: false 
      },
    ];
    

    eventoService.getEventos.and.returnValue(of(mockEventos));
    component.ngOnInit();

    expect(eventoService.getEventos).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockEventos);
    expect(component.isLoading).toBeFalse();
  });

  it('debe manejar errores al cargar eventos', () => {
    const errorResponse = new HttpErrorResponse({ error: 'Error al cargar eventos', status: 404 });
    eventoService.getEventos.and.returnValue(throwError(() => errorResponse));
    errorHandler.getErrorMessage.and.returnValue('Error de carga');

    component.loadEventos();

    expect(eventoService.getEventos).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Error de carga');
    expect(component.isLoading).toBeFalse();
  });

});
