import { Banco } from './../../../../models/banco';
import { DialogService } from 'primeng/dynamicdialog';
import { ContaCorrente } from './../../../../models/conta-corrente';
import { ContaCorrenteService } from './../../../../service/conta-corrente.service';
import { Component, OnInit } from '@angular/core';
import { ContaCorrenteCadastroComponent } from '../conta-corrente-cadastro/conta-corrente-cadastro.component';

@Component({
  selector: 'app-conta-corrente-pesquisa',
  templateUrl: './conta-corrente-pesquisa.component.html',
  styleUrls: ['./conta-corrente-pesquisa.component.sass']
})
export class ContaCorrentePesquisaComponent implements OnInit {

  public contaCorrenteArray: ContaCorrente[] = [];
  public array = [];
  public total: number = 0;
  public displayDeleteModal: boolean = false;
  public displayDetailsModal: boolean = false;
  public title = 'Conta Corrente';
  public detailsModalTitle = 'Visualizar Conta Corrente';
  public contaDelete = {} as any;
  public conta = {} as ContaCorrente;
  public banco = {} as Banco;

  constructor(
    private contaCorrenteService: ContaCorrenteService,
    private dialog: DialogService
    ) { }


  ngOnInit(): void {
    this.findContaCorrente();
  }

  public findContaCorrente() {
    this.contaCorrenteService.findAll().subscribe((contaCorrenteArray: ContaCorrente[]) => {
      this.contaCorrenteArray = contaCorrenteArray;
      this.total = contaCorrenteArray.length;
    });
  }

  async openDialog(id: number): Promise<void> {
    let headerTitle = 'Inserir Conta Corrente';
    if(id > 0) headerTitle = 'Editar Conta Corrente';
    const data = {
      id: (id),
    };
    const dialogRef = this.dialog.open(ContaCorrenteCadastroComponent, {
      width: '60%',
      dismissableMask: false,
      data,
      header: headerTitle
    }).onClose.subscribe(() => { this.findContaCorrente() });
  }

  editRow($event: any) {
    console.log($event);
  }

  deleteRow(array: ContaCorrente) {
    this.contaDelete = array;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  closeDetailsModal() {
    this.displayDetailsModal = false;
  }

  deleteConta() {
    this.contaCorrenteService.delete(this.contaDelete).subscribe((resultado) => {
      this.findContaCorrente();
      this.displayDeleteModal = false;
    })
  }

  mostrarDetalhes(array: any) {
    console.log(array);
    this.displayDetailsModal = true;
    this.conta = array;
    this.banco = this.conta.banco;
  }
}
