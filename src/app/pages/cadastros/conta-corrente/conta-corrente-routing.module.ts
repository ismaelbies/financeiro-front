import { ContaCorrenteCadastroComponent } from './conta-corrente-cadastro/conta-corrente-cadastro.component';
import { ContaCorrentePesquisaComponent } from './conta-corrente-pesquisa/conta-corrente-pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'conta-corrente',
    component: ContaCorrentePesquisaComponent,
    data: { roles: ['ROLE_PESQUISAR_CONTA_CORRENTE']}
  },
  {
    path: 'conta-corrente/novo',
    component: ContaCorrenteCadastroComponent,
    data: { roles: ['ROLE_CADASTRAR_CONTA_CORRENTE']}
  },
  {
    path: 'conta-corrente/novo/:id',
    component: ContaCorrenteCadastroComponent,
    data: { roles: ['ROLE_PESQUISAR_CONTA_CORRENTE']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaCorrenteRoutingModule { }
