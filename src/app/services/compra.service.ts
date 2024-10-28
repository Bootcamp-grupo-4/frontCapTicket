import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Compra } from '../models/compra';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class CompraService {
    private eventoUrl = 'http://localhost:8888/ventaentradas';

    constructor(private http: HttpClient) { }

    //* Método para añadir evento
    compra(compra: Compra): Observable<Compra> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Compra>(this.eventoUrl, compra, { headers });
    }
}
