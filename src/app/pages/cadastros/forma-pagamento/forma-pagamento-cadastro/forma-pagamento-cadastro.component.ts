import { FormaPagamentoService } from './../../../../service/forma-pagamento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormaPagamento } from 'src/app/models/forma-pagamento';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-cadastro',
  templateUrl: './forma-pagamento-cadastro.component.html',
  styleUrls: ['./forma-pagamento-cadastro.component.sass']
})
export class FormaPagamentoCadastroComponent implements OnInit {

  public formaPagamento = {} as any;
  formulario!: FormGroup;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.createForm();
    const id = this.config.data.id;
    if (id > 0) {
      this.getFormaPagamentoById(id);
    }
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      idTipoFormaPagamento: [],
      descricao: [],
      status: this.formBuilder.group({
        id : [],
        codigo: ['ativo'],
        descricao: []
      }),
      tipo: this.formBuilder.group({
        id : [],
        codigo: ['nenhum'],
        descricao: []
      })
    });
  }

  close() {
    this.ref.close();
  }

  public getFormaPagamentoById(idTipoFormaPagamento: number) {
    this.formaPagamentoService.findFormaPagamentoById(idTipoFormaPagamento).subscribe((formaPagamento: FormaPagamento) => {
      this.formulario.patchValue(formaPagamento);
      console.log(formaPagamento);
    });
  }

  public saveOrUpdate() {
    if(this.formulario.get('idTipoFormaPagamento')?.value > 0) return this.updateFormaPagamento();
    return this.saveFormaPagamento();
  }

  public saveFormaPagamento() {
    this.createFormaPagamento(false);
    this.formaPagamentoService.save(this.formaPagamento).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public updateFormaPagamento() {
    this.createFormaPagamento(true);
    this.formaPagamentoService.update(this.formaPagamento).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public selectStatus(statusForm: string) {
    return statusForm == 'ativo' ? 0 : 1;
  }

  public selectTipo(tipoForm: string) {
    var tipo = 0; //Nenhum
    if(tipoForm == 'boleto') tipo = 1;
    if(tipoForm == 'cheque') tipo = 2;
    return tipo;
  }

  createFormaPagamento(isUpdate: boolean) {
    this.formaPagamento = {
      idTipoFormaPagamento: isUpdate ? this.formulario.get('idTipoFormaPagamento')?.value : null,
      descricao: this.formulario.get('descricao')?.value,
      status :  this.selectStatus(this.formulario.get('status')?.get('codigo')?.value),
      tipo : this.selectTipo(this.formulario.get('tipo')?.get('codigo')?.value),
    }
  }
}
