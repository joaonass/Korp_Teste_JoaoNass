import { Component } from '@angular/core';


@Component({
  selector: 'app-nota-fiscal',
  imports: [],
  templateUrl: './nota-fiscal.html',
  styleUrl: './nota-fiscal.css',
})
export class NotaFiscal {
  notaFiscal: any[] = [];

  adicionarProduto() {
    this.notaFiscal.push({});
  }

  removerProduto(index: number) {
    this.notaFiscal.splice(index, 1);
  }
}
