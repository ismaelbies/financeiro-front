import { ContaModule } from './conta/conta.module';
import { ContaCorrenteModule } from './conta-corrente/conta-corrente.module';
import { FormaPagamentoModule } from './forma-pagamento/forma-pagamento.module';
import { NgModule } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CartaoCreditoModule } from './cartao-credito/cartao-credito.module';
import {FieldsetModule} from 'primeng/fieldset';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [
  ],
  imports: [
    FormaPagamentoModule,
    ContaCorrenteModule,
    CartaoCreditoModule,
    ContaModule,
    DynamicDialogModule,
    ContaModule,
    InputMaskModule,
    CurrencyMaskModule,
    InputNumberModule,
    FieldsetModule
  ],
  providers: [
    DialogService,
    {
      provide: DynamicDialogConfig,
      useValue: {}
    },
    {
      provide: DynamicDialogRef,
      useValue: {}
    },
  ]
})
export class CadastrosModule { }
