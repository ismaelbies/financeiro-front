import { FormaPagamento } from './../../../../models/forma-pagamento';
import { FormaPagamentoService } from './../../../../service/forma-pagamento.service';
import { Favorecido } from './../../../../models/favorecido';
import { FavorecidoService } from './../../../../service/favorecido.service';
import { ContaCorrente } from './../../../../models/conta-corrente';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Conta } from 'src/app/models/conta';
import { ContaCorrenteService } from 'src/app/service/conta-corrente.service';
import { ContaService } from 'src/app/service/conta.service';
import { DatePipe } from '@angular/common';
import { CartaoCredito } from 'src/app/models/cartao-credito';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';

@Component({
  selector: 'app-conta-cadastro',
  templateUrl: './conta-cadastro.component.html',
  styleUrls: ['./conta-cadastro.component.sass']
})
export class ContaCadastroComponent implements OnInit {

  conta = {} as any;
  contaCorrenteArray = [] as ContaCorrente[];
  favorecidoArray = [] as Favorecido[];
  formaPagamentoArray = [] as FormaPagamento[];
  cartaoCreditoArray = [] as CartaoCredito[];
  formulario!: FormGroup;
  datePipe = new DatePipe("en-US");
  tipoConta = [{'id': 0, 'codigo': 'dinheiro', 'descricao': 'Dinheiro'},
  {'id': 1, 'codigo': 'contacorrente', 'descricao': 'Conta Corrente'},
  {'id': 2, 'codigo': 'poupanca', 'descricao': 'Poupança'},
  {'id': 3, 'codigo': 'cobranca', 'descricao': 'Cobrança'},
  {'id': 4, 'codigo': 'cartaocredito', 'descricao': 'Cartão Crédito'},
  {'id': 5, 'codigo': 'cartaorecebimento', 'descricao': 'Cartão Recebimento'}];

  constructor(
    private contaService: ContaService,
    private contaCorrenteService: ContaCorrenteService,
    private favorecidoService: FavorecidoService,
    private formaPagamentoService: FormaPagamentoService,
    private cartaoCreditoService: CartaoCreditoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getContaCorrente();
    this.getCartaoCredito();
    this.getFavorecido();
    this.getFormaPagamento();
    this.formDinheiro();
    if (this.config.data.id > 0) {
      this.getContaById(this.config.data.id);
    }
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      idConta: ['0'],
      tipo: this.formBuilder.group({
        id: ['0', [Validators.required]],
      }),
      nome: ['', [Validators.required]],
      status: this.formBuilder.group({
        id: ['0', [Validators.required]],
      }),
      valorSaldoAbertura: [''],
      dataAbertura: ['', [Validators.required]],
      visivel: ['true', [Validators.required]],
      saldoContas: ['true', [Validators.required]],
      saldoFluxoCaixa: ['true', [Validators.required]],
      codigoIntegracao: [''],
      taxaCartao: [''],
      prazoPagamentoDiaUtil: ['', [Validators.required, Validators.min(0)]],
      prazoPagamentoDiaCorrido: ['', [Validators.required, Validators.min(0)]],
      contaCorrente: this.formBuilder.group({
        idContaCorrente: [''],
      }),
      favorecido: this.formBuilder.group({
        idFavorecido: [''],
      }),
      tipoFormaPagamentos: this.formBuilder.array([]),
      // cartaoCredito: this.formBuilder.group({
      //   idCartaoCredito: [''],
      // })
    });
  }

  get tipoFormaPagamentos() {
    return this.formulario.controls['tipoFormaPagamentos'] as FormArray;
  }

  public addOrRemoveFormaPagamento(id: any, e: any) {
    if(e.target.checked) {
      const formaPagamentoFormgroup = this.formBuilder.group({
        idTipoFormaPagamento: [id],
      });
      this.tipoFormaPagamentos.push(formaPagamentoFormgroup);
    } else {
      const index = this.tipoFormaPagamentos.controls.findIndex(x => x.value === e.target.value);
      this.tipoFormaPagamentos.removeAt(index);
    }
  }

  public getContaById(idConta: number) {
    this.contaService.findById(idConta).subscribe((conta: Conta) => {
      this.formulario.patchValue(conta);
      let dataAbertura = new Date(this.formulario.get('dataAbertura')?.value);
      let dataAberturaFormatada = this.datePipe.transform(dataAbertura, 'dd/MM/yyyy');
      this.formulario.get('dataAbertura')?.setValue(dataAberturaFormatada);
      conta.tipoFormaPagamentos = conta.tipoFormaPagamentos as [];
      conta.tipoFormaPagamentos.forEach((formaPagamento: FormaPagamento) => {
        const formaPagamentoFormgroup = this.formBuilder.group({
          idTipoFormaPagamento: [formaPagamento.idTipoFormaPagamento],
        });
        this.tipoFormaPagamentos.push(formaPagamentoFormgroup);
      })
      console.log(conta.tipoFormaPagamentos);
    });
  }

  public getFavorecido() {
    this.favorecidoService.findAll().subscribe((favorecidoArray: Favorecido[]) => {
      this.favorecidoArray = favorecidoArray;
    });
  }

  public getContaCorrente() {
    this.contaCorrenteService.findAll().subscribe((contaCorrenteArray: ContaCorrente[]) => {
      this.contaCorrenteArray = contaCorrenteArray;
    });
  }

  public getFormaPagamento() {
    this.formaPagamentoService.findAll().subscribe((formaPagamentoArray: FormaPagamento[]) => {
      this.formaPagamentoArray = formaPagamentoArray;
    });
  }

  public getCartaoCredito() {
    this.cartaoCreditoService.findAll().subscribe((cartaoCreditoArray: CartaoCredito[]) => {
      this.cartaoCreditoArray = cartaoCreditoArray;
    });
  }

  public saveOrUpdate() {
    if(this.formulario.get('idConta')?.value > 0) this.updateConta();
    else this.saveConta();
  }

  public saveConta() {
    this.createConta(false);
    this.contaService.save(this.conta).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public updateConta() {
    this.createConta(true);
    this.contaService.update(this.conta).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public closeDialog() {
    // this.ref.close();
    console.log(this.formulario.get('tipoFormaPagamentos')?.value);
  }

  public changeTipo() {
    const tipo = this.formulario.get('tipo')?.get('id')?.value;
    if(tipo == 0) this.formDinheiro();
    if(tipo == 1) this.formContaCorrente();
    if(tipo == 2) this.formPoupanca();
    if(tipo == 4) this.formCartaoCredito();
    if(tipo == 5) this.formCartaoRecebimento();
  }

  public formDinheiro() {
    this.formulario.get('contaCorrente')?.get('idContaCorrente')?.setValue(null);
    this.formulario.get('taxaCartao')?.setValue(null);
    this.formulario.get('favorecido')?.get('idFavorecido')?.setValue(null);
    document.getElementById('contaCorrenteDiv')?.classList.add('d-none');
    document.getElementById('cartaoDiv')?.classList.add('d-none');
    document.getElementById('cartaoCreditoDiv')?.classList.add('d-none');
  }

  public formCartaoRecebimento() {
    this.getContaCorrente();
    document.getElementById('contaCorrenteDiv')?.classList.remove('d-none');
    document.getElementById('cartaoCreditoDiv')?.classList.add('d-none');
    document.getElementById('cartaoDiv')?.classList.remove('d-none');
  }

  public formCartaoCredito() {
    document.getElementById('cartaoCreditoDiv')?.classList.remove('d-none');
    document.getElementById('contaCorrenteDiv')?.classList.add('d-none');
    document.getElementById('cartaoDiv')?.classList.add('d-none')
  }

  public formContaCorrente() {
    this.getContaCorrente();
    document.getElementById('cartaoCreditoDiv')?.classList.add('d-none');
    document.getElementById('contaCorrenteDiv')?.classList.remove('d-none');
    document.getElementById('cartaoDiv')?.classList.add('d-none');
  }

  public formPoupanca() {
    var poupanca = this.contaCorrenteArray.filter(function(conta) {
      return conta.poupanca == true;
    });
    this.contaCorrenteArray = poupanca;
    document.getElementById('cartaoCreditoDiv')?.classList.add('d-none');
    document.getElementById('contaCorrenteDiv')?.classList.remove('d-none');
    document.getElementById('cartaoDiv')?.classList.add('d-none')
  }

  public getFormaPagamentoById() {
    // this.formaPagamentoService.findFormaPagamentoById();
  }

  public createConta(isUpdate: boolean) {
    console.log(this.formulario.getRawValue());
    let str = this.formulario.get('dataAbertura')?.value;
    const [day,month,year] = str.split('/');
    let novaData = new Date(+year, +month - 1, +day);


    console.log(novaData);
    console.log(day);
    let datePipe = new DatePipe("en-US");
    let dataFormatada = datePipe.transform(novaData, 'yyyy-MM-dd')
    this.conta = {
      idConta: isUpdate ? this.formulario.get('idConta')?.value : null,
      nome: this.formulario.get('nome')?.value,
      tipo:  this.formulario.get('tipo')?.get('id')?.value,
      status: this.formulario.get('status')?.get('id')?.value,
      valorSaldoAbertura: this.formulario.get('valorSaldoAbertura')?.value,
      dataAbertura: dataFormatada,
      visivel: this.formulario.get('visivel')?.value,
      saldoContas: this.formulario.get('saldoContas')?.value,
      saldoFluxoCaixa: this.formulario.get('saldoFluxoCaixa')?.value,
      codigoIntegracao: '',
      taxaCartao: this.formulario.get('taxaCartao')?.value,
      prazoPagamentoDiaUtil: 0,
      prazoPagamentoDiaCorrido: 0,
      contaCorrente: {
        idContaCorrente: this.formulario.get('contaCorrente')?.get('idContaCorrente')?.value,
      },
      favorecido: {
        idFavorecido: this.formulario.get('favorecido')?.get('idFavorecido')?.value,
      },
      tipoFormaPagamentos: this.formulario.get('tipoFormaPagamentos')?.value,
      // cartaoCredito: {
      //   idCartaoCredito: this.formulario.get('cartaoCredito')?.get('idCartaoCredito')?.value
      // }
    }

  }
}
