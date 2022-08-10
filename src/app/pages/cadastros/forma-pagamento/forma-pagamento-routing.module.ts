import { FormaPagamentoCadastroComponent } from './forma-pagamento-cadastro/forma-pagamento-cadastro.component';
import { FormaPagamentoPesquisaComponent } from './forma-pagamento-pesquisa/forma-pagamento-pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'forma-pagamento',
    component: FormaPagamentoPesquisaComponent,
    data: { roles: ['ROLE_PESQUISAR_FORMA_PAGAMENTO']}
  },
  {
    path: 'forma-pagamento/novo',
    component: FormaPagamentoCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_FORMA_PAGAMENTO']}
  },
  {
    path: 'forma-pagamento/novo/:id',
    component: FormaPagamentoCadastroComponent,
    data: { roles: ['ROLE_PESQUISAR_FORMA_PAGAMENTO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormaPagamentoRoutingModule { }
