import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../models/evento';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private eventoUrl = 'http://localhost:8081/evento';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los eventos como Observable de Evento[]
  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.eventoUrl, httpOptions);
  }
}
