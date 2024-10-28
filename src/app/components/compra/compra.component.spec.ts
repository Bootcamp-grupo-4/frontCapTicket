import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraComponent } from './compra.component';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CompraService } from '../../services/compra.service';

describe('CompraComponent', () => {
  let component: CompraComponent;
  let fixture: ComponentFixture<CompraComponent>;
  let eventoService: jasmine.SpyObj<EventoService>;
  let compraService: jasmine.SpyObj<CompraService>;
  let router: jasmine.SpyObj<Router>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const eventoServiceMock = jasmine.createSpyObj('EventoService', ['getEventoById']);
    const compraServiceMock = jasmine.createSpyObj('CompraService', ['compra']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CompraComponent, FormsModule],
      providers: [
        { provide: EventoService, useValue: eventoServiceMock },
        { provide: CompraService, useValue: compraServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
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

    fixture = TestBed.createComponent(CompraComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService) as jasmine.SpyObj<EventoService>;
    compraService = TestBed.inject(CompraService) as jasmine.SpyObj<CompraService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    debugElement = fixture.debugElement;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a comprar y navegar en caso de éxito', async () => {
    const mockCompra: any = {
      mensaje: 'Venta confirmada',
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

    compraService.compra.and.returnValue(of(mockCompra));

    await component.compra();

    expect(compraService.compra).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('debería manejar el error y mostrar un mensaje de error', async () => {
    const errorMessage = 'Error al comprar entrada';
    compraService.compra.and.returnValue(throwError(() => new Error(errorMessage)));

    await component.compra();

    expect(compraService.compra).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Ocurrió un error inesperado. Inténtalo de nuevo.');
  });

  it('debería mostrar un error de validación cuando el formulario es inválido', async () => {
    component.evento.nombre = '';
    component.evento.descripcion = 'Descripción válida';

    await component.compra();

    expect(component.errorMessage).toEqual('Ocurrió un error inesperado. Inténtalo de nuevo.');
  });

  it('debería mostrar el botón de volver atrás y navegar cuando se hace clic', () => {
    const backButton = debugElement.query(By.css('button[color="warn"]'));
    backButton.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith(['/list']);
  });
});
