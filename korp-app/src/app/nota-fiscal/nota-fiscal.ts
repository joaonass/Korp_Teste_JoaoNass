import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ProdutoService,
  ProdutoModel
} from '../services/produto.service';

import {
  NotaFiscalService,
  NotaFiscal as NotaFiscalModel,
  CriarNotaFiscal
} from '../services/nota-fiscal.service';

import {
  ChangeDetectorRef
} from '@angular/core';


interface ProdutoNota {
  id: number;
  produtoId: number | null;
  quantidade: number | null;
}

interface Nota {
  status: string;
  produtos: ProdutoNota[];
}


@Component({
  selector: 'app-nota-fiscal',
  imports: [FormsModule],
  templateUrl: './nota-fiscal.html',
  styleUrl: './nota-fiscal.css',
})
export class NotaFiscal implements OnInit {

  produtoJaSelecionado(
    nota: Nota,
    produtoId: number,
    indiceProdutoAtual: number
  ): boolean {

    return nota.produtos.some(
      (produto, indice) =>
        indice !== indiceProdutoAtual &&
        produto.produtoId === produtoId
    );

  }

  private proximoIdProduto = 1;

  produtos: ProdutoModel[] = [];

  notas: Nota[] = [
    {
      status: 'Aberto',
      produtos: [
        {
          id: this.proximoIdProduto++,
          produtoId: null,
          quantidade: null
        }
      ]
    }
  ];

  notasCadastradas: NotaFiscalModel[] = [];

  mostrarNotasFechadas = false;

  carregando = false;


  constructor(
    private produtoService: ProdutoService,
    private notaFiscalService: NotaFiscalService,
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {

    this.produtoService.listarProdutos().subscribe({

      next: (produtos) => {

        console.log(
          'Produtos carregados:',
          produtos
        );

        this.produtos = produtos;

      },

      error: (erro) => {

        console.error(
          'Erro ao carregar produtos:',
          erro
        );

      }

    });

    this.carregarNotas();

  }

  get notasAbertas(): NotaFiscalModel[] {

    return this.notasCadastradas.filter(
      nota => nota.status === 'Aberta'
    );

  }


  get notasFechadas(): NotaFiscalModel[] {

    return this.notasCadastradas.filter(
      nota => nota.status === 'Fechada'
    );

  }


  obterDescricaoProduto(produtoId: number): string {

    const produto = this.produtos.find(
      p => p.id === produtoId
    );

    return produto
      ? produto.descricao
      : 'Produto não encontrado';

  }


  obterSaldoProduto(produtoId: number | null): number {

    if (produtoId === null) {
      return 0;
    }

    const produto = this.produtos.find(
      p => p.id === produtoId
    );

    return produto?.saldo ?? 0;

  }

  adicionarNota(): void {

    this.notas.push({

      status: 'Aberto',

      produtos: [
        {
          id: this.proximoIdProduto++,
          produtoId: null,
          quantidade: null
        }
      ]

    });

  }


  removerNota(indiceNota: number): void {

    this.notas.splice(
      indiceNota,
      1
    );

  }

  adicionarProduto(indiceNota: number): void {

    this.notas[indiceNota].produtos.push({

      id: this.proximoIdProduto++,

      produtoId: null,

      quantidade: null

    });

  }


  removerProduto(
    indiceNota: number,
    indiceProduto: number
  ): void {

    this.notas[indiceNota].produtos.splice(
      indiceProduto,
      1
    );

  }

  cadastrarNotas(): void {

    console.log(
      'Notas que serão enviadas:',
      this.notas
    );


    for (const nota of this.notas) {

      for (const produto of nota.produtos) {

        if (produto.produtoId === null) {

          alert(
            'Selecione um produto antes de cadastrar a nota.'
          );

          return;

        }


        if (
          produto.quantidade === null ||
          produto.quantidade <= 0
        ) {

          alert(
            'Informe uma quantidade válida para todos os produtos.'
          );

          return;

        }


        const produtoEstoque = this.produtos.find(
          p => p.id === produto.produtoId
        );


        if (!produtoEstoque) {

          alert(
            'O produto selecionado não existe no estoque.'
          );

          return;

        }


        if (
          produto.quantidade >
          produtoEstoque.saldo
        ) {

          alert(
            `Estoque insuficiente para "${produtoEstoque.descricao}".\n` +
            `Saldo disponível: ${produtoEstoque.saldo}.`
          );

          return;

        }

      }

    }


    this.carregando = true;


    const requisicoes =
      this.notas.map(nota => {

        const novaNota: CriarNotaFiscal = {

          itens: nota.produtos.map(produto => ({

            produtoId: produto.produtoId!,

            quantidade: produto.quantidade!

          }))

        };


        return this.notaFiscalService.criarNota(
          novaNota
        );

      });


    let concluidas = 0;


    requisicoes.forEach(requisicao => {

      requisicao.subscribe({

        next: (notaCriada) => {

          console.log(
            'Nota criada:',
            notaCriada
          );


          concluidas++;


          if (
            concluidas ===
            requisicoes.length
          ) {

            this.finalizarCadastroNotas();

          }

        },


        error: (erro) => {

          console.error(
            'Erro ao criar nota:',
            erro
          );


          this.carregando = false;


          alert(
            erro.error?.mensagem ||
            'Ocorreu um erro ao criar uma das notas fiscais.'
          );

        }

      });

    });

  }


  private finalizarCadastroNotas(): void {

    this.carregando = false;


    alert(
      'Notas fiscais criadas com sucesso!'
    );


    this.notas = [

      {

        status: 'Aberto',

        produtos: [

          {

            id: this.proximoIdProduto++,

            produtoId: null,

            quantidade: null

          }

        ]

      }

    ];


    this.carregarNotas();

  }

  private carregarNotas(): void {

    console.log('Buscando notas na API...');

    this.notaFiscalService.listarNotas().subscribe({

      next: (notas) => {

        console.log(
          'Notas fiscais carregadas:',
          notas
        );

        this.notasCadastradas = [...notas];

        console.log(
          'Notas abertas:',
          this.notasAbertas
        );

        console.log(
          'Notas fechadas:',
          this.notasFechadas
        );
        this.cdr.detectChanges();

      },

      error: (erro) => {

        console.error(
          'Erro ao carregar notas fiscais:',
          erro
        );

      }

    });

  }

  alternarNotasFechadas(): void {

    this.mostrarNotasFechadas =
      !this.mostrarNotasFechadas;

  }

  imprimirNota(id: number): void {

    this.carregando = true;


    console.log(
      'Imprimindo nota:',
      id
    );


    this.notaFiscalService
      .imprimirNota(id)
      .subscribe({

        next: (notaAtualizada) => {

          console.log(
            'NOTA RECEBIDA:',
            notaAtualizada
          );

          this.notasCadastradas =
            this.notasCadastradas.map(nota =>

              nota.id === notaAtualizada.id
                ? notaAtualizada
                : nota

            );


          this.carregando = false;


          alert(
            'Nota fiscal impressa com sucesso!'
          );

        },


        error: (erro) => {

          console.error(
            'Erro ao imprimir nota:',
            erro
          );


          this.carregando = false;


          if (erro.status === 503) {

            alert(
              'O serviço de estoque está indisponível. ' +
              'Tente novamente mais tarde.'
            );

            return;

          }


          alert(
            erro.error?.mensagem ||
            'Não foi possível imprimir a nota fiscal.'
          );

        }

      });

  }

}
