import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemNota {
  produtoId: number;
  quantidade: number;
}

export interface NotaFiscal {
  id: number;
  codigo: number;
  status: string;
  itens: ItemNota[];
}

export interface CriarNotaFiscal {
  itens: ItemNota[];
}

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {

  private apiUrl = 'http://localhost:5248/api/NotasFiscais';

  constructor(private http: HttpClient) { }

  listarNotas(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.apiUrl);
  }

  criarNota(nota: CriarNotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(
      this.apiUrl,
      nota
    );
  }

  imprimirNota(id: number): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(
      `${this.apiUrl}/${id}/imprimir`,
      {}
    );
  }
}
