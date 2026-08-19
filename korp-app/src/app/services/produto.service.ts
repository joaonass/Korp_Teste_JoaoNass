import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProdutoModel {
  id: number;
  codigo: string;
  descricao: string;
  saldo: number;
}

export interface CriarProduto {
  descricao: string;
  saldo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:5250/api/Produto';

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(this.apiUrl);
  }

  criarProduto(produto: CriarProduto): Observable<ProdutoModel> {
    return this.http.post<ProdutoModel>(this.apiUrl, produto);
  }

  atualizarProduto(
    id: number,
    produto: CriarProduto
  ): Observable<ProdutoModel> {
    return this.http.put<ProdutoModel>(
      `${this.apiUrl}/${id}`,
      produto
    );
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
