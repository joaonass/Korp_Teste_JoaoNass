import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService, ProdutoModel } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  imports: [FormsModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto implements OnInit {

  produtos: ProdutoModel[] = [];

  produtosEstoque: ProdutoModel[] = [];

  mostrarEstoque = false;

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {

    this.adicionarProduto();

  }


  adicionarProduto(): void {

    this.produtos.push({

      id: 0,
      codigo: '',
      descricao: '',
      saldo: 0

    });

  }


  removerProduto(index: number): void {

    this.produtos.splice(index, 1);

  }

  cadastrarProdutos(): void {

    for (const produto of this.produtos) {

      this.produtoService.criarProduto({

        descricao: produto.descricao,
        saldo: produto.saldo

      }).subscribe({

        next: (novoProduto) => {

          console.log(
            'Produto cadastrado:',
            novoProduto
          );

        },

        error: (erro) => {

          console.error(
            'Erro ao cadastrar produto:',
            erro
          );

        }

      });

    }

  }

  verificarEstoque(): void {

    console.log('BOTÃO CLICADO');
    console.log('Estado antes:', this.mostrarEstoque);

    this.mostrarEstoque = !this.mostrarEstoque;

    console.log('Estado depois:', this.mostrarEstoque);

    if (this.mostrarEstoque) {

      this.carregarEstoque();

    }

  }


  carregarEstoque(): void {

    this.produtoService.listarProdutos().subscribe({

      next: (produtos) => {

        console.log(
          'Produtos do estoque:',
          produtos
        );

        this.produtosEstoque = produtos;

        this.mostrarEstoque = true;

      },

      error: (erro) => {

        console.error(
          'Erro ao carregar produtos do estoque:',
          erro
        );

      }

    });

  }

}
