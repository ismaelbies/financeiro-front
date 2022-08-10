import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CartaoCredito } from 'src/app/models/cartao-credito';
import { ContaCorrente } from 'src/app/models/conta-corrente';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';
import { ContaCorrenteService } from 'src/app/service/conta-corrente.service';

@Component({
  selector: 'app-cartao-credito-cadastro',
  templateUrl: './cartao-credito-cadastro.component.html',
  styleUrls: ['./cartao-credito-cadastro.component.sass']
})
export class CartaoCreditoCadastroComponent implements OnInit {

  private cartaoCredito = {} as any;
  contaCorrenteArray: ContaCorrente[] = [];
  formulario!: FormGroup;

  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private contaCorrenteService: ContaCorrenteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.getContaCorrente();
    this.createForm();
    console.log(this.config.data.id);
    if (this.config.data.id > 0) {
      this.getCartaoCreditoById(this.config.data.id);
    }
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      idCartaoCredito: ['0'],
      nome: ['', [Validators.required]],
      bandeira: ['', [Validators.required]],
      diaFechamento: ['', [Validators.required]],
      diaVencimento: ['', [Validators.required]],
      valorLimiteCredito: ['', [Validators.required]],
      contaCorrente: this.formBuilder.group({
        idContaCorrente: ['', [Validators.required]],
      }),
    })
  }

  getCartaoCreditoById(id: number) {
    this.cartaoCreditoService.findById(id).subscribe((cartaoCredito: CartaoCredito) => {
      this.formulario.patchValue(cartaoCredito);
      console.log(this.formulario);
    });
  }

  getContaCorrente() {
    this.contaCorrenteService.findAll().subscribe((contas: ContaCorrente[]) => {
      this.contaCorrenteArray = contas;
    })
  }

  public saveOrUpdate() {
    if(this.formulario.get('idCartaoCredito')?.value > 0) this.updateCartaoCredito();
    else this.saveCartaoCredito();
  }

  public saveCartaoCredito() {
    this.createCartaoCredito(false);
    this.cartaoCreditoService.save(this.cartaoCredito).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public updateCartaoCredito() {
    this.createCartaoCredito(true);
    this.cartaoCreditoService.update(this.cartaoCredito).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public closeDialog() {
    this.ref.close();
  }

  public createCartaoCredito(isUpdate: boolean) {
    this.cartaoCredito = {
      idCartaoCredito: isUpdate ? this.formulario.get('idCartaoCredito')?.value : null,
      nome: this.formulario.get('nome')?.value,
      bandeira: this.formulario.get('bandeira')?.value,
      diaFechamento: this.formulario.get('diaFechamento')?.value,
      diaVencimento: this.formulario.get('diaVencimento')?.value,
      valorLimiteCredito: this.formulario.get('valorLimiteCredito')?.value,
      contaCorrente: {
        idContaCorrente: this.formulario.get('contaCorrente')?.get('idContaCorrente')?.value
      },
      nomeTitular: null,
      numero: null,
      numeroFinal: null,
      codigoSeguranca: null
    }
    console.log(this.cartaoCredito);
  }
}
