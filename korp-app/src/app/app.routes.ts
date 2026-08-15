import { Routes } from '@angular/router';
import { Produto } from './produto/produto';
import { Home } from './home/home';
import { NotaFiscal } from './nota-fiscal/nota-fiscal';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'produto',
    component: Produto
  },

  {
    path: "nota-fiscal",
    component: NotaFiscal
  }
];
