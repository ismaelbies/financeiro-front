import { ContaPesquisaComponent } from './../../../pages/cadastros/conta/conta-pesquisa/conta-pesquisa.component';
import { ContaCadastroComponent } from './../../../pages/cadastros/conta/conta-cadastro/conta-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'conta',
    component: ContaPesquisaComponent,
    data: { roles: ['ROLE_PESQUISAR_CONTA']}
  },
  {
    path: 'conta/novo',
    component: ContaCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_CONTA']}
  },
  {
    path: 'conta/novo/:id',
    component: ContaCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_CONTA']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
