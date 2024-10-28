import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDeleteDialogComponent>>;

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'Evento Test' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ConfirmDeleteDialogComponent>>;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el nombre del evento en el mensaje de confirmación', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const confirmMessage = compiled.querySelector('mat-dialog-content p');
    expect(confirmMessage?.textContent).toContain('Evento Test');
  });  

  it('debe cerrar el diálogo con "true" al confirmar', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('debe cerrar el diálogo con "false" al cancelar', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
