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

  obterDescricaoProduto(produtoId: number): string {

    const produto = this.produtos.find(
      p => p.id === produtoId
    );

    return produto
      ? produto.descricao
      : 'Produto não encontrado';

  }

  private proximoIdProduto = 1;

  produtos: ProdutoModel[] = [];

  notas: Nota[] = [
    {
      status: 'aberto',
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

  mostrarNotas = false;

  carregando = false;


  constructor(
    private produtoService: ProdutoService,
    private notaFiscalService: NotaFiscalService
  ) { }



  ngOnInit(): void {

    this.produtoService.listarProdutos().subscribe({

      next: (produtos) => {
        console.log('Produtos carregados:', produtos);

        this.produtos = produtos;
      },

      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }

    });


    this.notaFiscalService.listarNotas().subscribe({

      next: (notas) => {
        console.log('Notas recebidas:', notas);

        this.notasCadastradas = notas;
      },

      error: (erro) => {
        console.error('Erro ao buscar notas:', erro);
      }

    });

  }


  adicionarNota(): void {

    this.notas.push({

      status: 'aberto',

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

    this.notas.splice(indiceNota, 1);

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


  imprimirNotas(): void {

    console.log(
      'Notas que serão enviadas:',
      this.notas
    );


    for (const nota of this.notas) {

      const possuiProdutoInvalido =
        nota.produtos.some(

          produto =>
            produto.produtoId === null ||
            produto.quantidade === null ||
            produto.quantidade <= 0

        );


      if (possuiProdutoInvalido) {

        alert(
          'Selecione todos os produtos e suas quantidades antes de imprimir.'
        );

        return;

      }

    }


    this.carregando = true;

    const requisicoes = this.notas.map(nota => {

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
            concluidas === requisicoes.length
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

        status: 'aberto',

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

  verificarNotas(): void {

    console.log(
      'Botão verificar notas clicado'
    );


    if (this.mostrarNotas) {

      this.mostrarNotas = false;

      return;

    }

    this.carregarNotas();

  }


  private carregarNotas(): void {

    console.log(
      'Buscando notas na API...'
    );


    this.carregando = true;


    this.notaFiscalService.listarNotas().subscribe({

      next: (notas) => {

        console.log(
          'Notas fiscais carregadas:',
          notas
        );


        this.notasCadastradas = notas;


        // IMPORTANTE:
        // Aqui abrimos a área das notas
        this.mostrarNotas = true;


        this.carregando = false;

      },


      error: (erro) => {

        console.error(
          'Erro ao carregar notas fiscais:',
          erro
        );


        this.carregando = false;


        this.mostrarNotas = false;


        alert(
          'Não foi possível carregar as notas fiscais.'
        );

      }

    });

  }

}
