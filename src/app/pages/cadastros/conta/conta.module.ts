import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRoutingModule } from './conta-routing.module';
import { ContaCadastroComponent } from './conta-cadastro/conta-cadastro.component';
import { ContaPesquisaComponent } from './conta-pesquisa/conta-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputMaskModule } from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [
    ContaCadastroComponent,
    ContaPesquisaComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    CurrencyMaskModule,
    InputNumberModule
  ]
})
export class ContaModule { }
