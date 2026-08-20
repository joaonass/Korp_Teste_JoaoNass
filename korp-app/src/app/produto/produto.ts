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

    this.carregarEstoque();
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

      if (!produto.descricao || produto.descricao.trim() === '') {

        alert('Informe o nome de todos os produtos.');

        return;
      }

      if (
        produto.saldo === null ||
        produto.saldo === undefined ||
        produto.saldo <= 0
      ) {

        alert(
          `Informe uma quantidade válida para o produto "${produto.descricao}".`
        );

        return;
      }

    }

    let cadastrados = 0;

    const totalProdutos = this.produtos.length;

    for (const produto of this.produtos) {

      this.produtoService.criarProduto({

        descricao: produto.descricao.trim(),

        saldo: produto.saldo

      }).subscribe({

        next: (novoProduto) => {

          console.log(
            'Produto cadastrado:',
            novoProduto
          );

          cadastrados++;


          if (cadastrados === totalProdutos) {

            alert('Produtos cadastrados com sucesso!');


            this.produtos = [];
            this.adicionarProduto();
            this.mostrarEstoque = true;

            this.carregarEstoque();

          }

        },

        error: (erro) => {

          console.error(
            'Erro ao cadastrar produto:',
            erro
          );

          alert(
            erro.error?.mensagem ||
            'Não foi possível cadastrar o produto.'
          );

        }

      });

    }

  }

  editarProduto(produto: ProdutoModel): void {

    const novaDescricao = prompt(
      'Digite o novo nome do produto:',
      produto.descricao
    );

    if (novaDescricao === null) {
      return;
    }

    if (novaDescricao.trim() === '') {
      alert('O nome do produto não pode ficar vazio.');
      return;
    }

    const novaQuantidade = prompt(
      'Digite a nova quantidade:',
      produto.saldo.toString()
    );

    if (novaQuantidade === null) {
      return;
    }

    const quantidade = Number(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
      alert('Informe uma quantidade válida.');
      return;
    }

    this.produtoService.atualizarProduto(
      produto.id,
      {
        descricao: novaDescricao.trim(),
        saldo: quantidade
      }
    ).subscribe({

      next: (produtoAtualizado) => {

        alert('Produto atualizado com sucesso!');

        this.carregarEstoque();

      },

      error: (erro) => {

        console.error(
          'Erro ao atualizar produto:',
          erro
        );

        alert(
          erro.error?.mensagem ||
          'Não foi possível atualizar o produto.'
        );

      }

    });

  }

  deletarProduto(produto: ProdutoModel): void {

    const confirmar = confirm(
      `Deseja realmente excluir o produto "${produto.descricao}"?`
    );

    if (!confirmar) {
      return;
    }

    this.produtoService.deletarProduto(produto.id).subscribe({

      next: () => {

        alert('Produto excluído com sucesso!');

        this.carregarEstoque();

      },

      error: (erro) => {

        console.error(
          'Erro ao excluir produto:',
          erro
        );

        alert(
          erro.error?.mensagem ||
          'Não foi possível excluir o produto.'
        );

      }

    });

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
