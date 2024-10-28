import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }

  getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return this.badRequestErrorHandler(error.error);
      case 401:
        return 'No está autorizado para realizar esta acción. Por favor, inicie sesión.';
      case 403:
        return 'Acceso denegado. No tiene permisos para acceder a esta información.';
      case 404:
        return 'Los eventos no se encontraron. Por favor, inténtelo de nuevo más tarde.';
      case 500:
        return 'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.';
      case 503:
        return 'El servicio no está disponible. Por favor, inténtelo de nuevo más tarde.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.';
    }
  }

  badRequestErrorHandler(error: any): string {
    if(error.error) {
      return "Error: " + error.error + ". Mensaje: " + error.message;
    }
    return 'La solicitud es incorrecta. Por favor, revise los datos e intente nuevamente.';
  }
}
