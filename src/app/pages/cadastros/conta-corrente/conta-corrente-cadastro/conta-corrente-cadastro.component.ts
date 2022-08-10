import { BancoService } from './../../../../service/banco.service';
import { ContaCorrenteService } from './../../../../service/conta-corrente.service';
import { ContaCorrente } from './../../../../models/conta-corrente';
import { Component, OnInit } from '@angular/core';
import { Banco } from 'src/app/models/banco';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-conta-corrente-cadastro',
  templateUrl: './conta-corrente-cadastro.component.html',
  styleUrls: ['./conta-corrente-cadastro.component.sass']
})
export class ContaCorrenteCadastroComponent implements OnInit {

  private contaCorrente = {} as any;
  public bancoArray: Banco[] = [];
  formulario!: FormGroup;

  constructor(
    private contaCorrenteService: ContaCorrenteService,
    private bancoService: BancoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ) { }

  ngOnInit(): void {
    this.getBancos();
    this.createForm();
    // const id = this.route.snapshot.params['id'];
    console.log(this.config.data.id);
    if (this.config.data.id > 0) {
      this.getContaCorrenteById(this.config.data.id);
    }
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      idContaCorrente: ['0', ],
      nome: ['', [Validators.required]],
      banco : this.formBuilder.group({
        idBanco: [''],
        nome: [''],
        numero: [''],
        website: [''],
      }),
      agenciaDv: ['', [Validators.required]],
      agencia: [''],
      contaCorrente: ['', [Validators.required]],
      contaCorrenteDv: [''],
      poupanca: ['false', [Validators.required]],
      limite: ['', [Validators.required, Validators.min(0)]],
    });
  }

  public getContaCorrenteById(idContaCorrente: number) {
    this.contaCorrenteService.findById(idContaCorrente).subscribe((contaCorrente: ContaCorrente) => {
      this.formulario.patchValue(contaCorrente);
      console.log(this.formulario);
    });
  }

  public getBancos() {
    this.bancoService.findAll().subscribe((bancos: Banco[]) => {
      this.bancoArray = bancos;
    });
  }

  public saveOrUpdate() {
    if(this.formulario.get('idContaCorrente')?.value > 0) this.updateContaCorrente();
    else this.saveContaCorrente();
  }

  public saveContaCorrente() {
    this.createContaCorrente(false);
    this.contaCorrenteService.save(this.contaCorrente).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public updateContaCorrente() {
    this.createContaCorrente(true);
    this.contaCorrenteService.update(this.contaCorrente).subscribe(resultado => {
      console.log(resultado);
      this.ref.close();
    },
    (error) => console.error(error)
    );
  }

  public closeDialog() {
    this.ref.close();
  }

  public createContaCorrente(isUpdate: boolean) {
    const str = this.formulario.get('limite')?.value;
    const subStr = 'R$ ';
    this.contaCorrente = {
      idContaCorrente: isUpdate ? this.formulario.get('idContaCorrente')?.value : null,
      nome: this.formulario.get('nome')?.value,
      agencia: this.formulario.get('agencia')?.value,
      contaCorrente: this.formulario.get('contaCorrente')?.value,
      poupanca: this.formulario.get('poupanca')?.value,
      carteiraCobrancas: null,
      limite: this.formulario.get('limite')?.value,
      banco : {
        idBanco: this.formulario.get('banco')?.get('idBanco')?.value
      },
      agenciaDv: null,
      contaCorrenteDv: null
    }
    console.log(this.formulario);
  }
}
