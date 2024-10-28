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
  private eventoUrl = 'http://localhost:7777/evento';

  constructor(private http: HttpClient) {}

  //* Método para obtener todos los eventos como Observable de Evento[]
  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.eventoUrl, httpOptions);
  }

  //* Método para eliminar un evento por su ID
  public deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.eventoUrl}/${id}`, httpOptions);
  }

  addEvento(evento: Evento): Observable<Evento> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Evento>(this.eventoUrl, evento, { headers });
  }

  editEvento(evento: Evento): Observable<Evento> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Evento>(this.eventoUrl, evento, { headers });
  }

  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(this.eventoUrl + '/' + id, httpOptions);
  }
}
