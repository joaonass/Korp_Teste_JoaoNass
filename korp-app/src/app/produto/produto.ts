import { Component } from '@angular/core';

@Component({
  selector: 'app-produto',
  imports: [],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto
{
  produtos: any[] = [];

  adicionarProduto() {
    this.produtos.push({});
  }

  removerProduto(index: number) {
    this.produtos.splice(index, 1);
  }
}
