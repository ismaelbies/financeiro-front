import { ContaCadastroComponent } from './../../../../pages/cadastros/conta/conta-cadastro/conta-cadastro.component';
import { ContaService } from './../../../../service/conta.service';
import { Conta } from './../../../../models/conta';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ContaCorrente } from 'src/app/models/conta-corrente';

@Component({
  selector: 'app-conta-pesquisa',
  templateUrl: './conta-pesquisa.component.html',
  styleUrls: ['./conta-pesquisa.component.sass']
})
export class ContaPesquisaComponent implements OnInit {


  public contaArray: Conta[] = [];
  public array = [];
  public total: number = 0;
  public displayDeleteModal: boolean = false;
  public displayDetailsModal: boolean = false;
  public title = 'Conta';
  public detailsModalTitle = 'Visualizar Conta';
  public contaDelete = {} as any;
  public conta = {} as Conta;
  // public tipo = {} as Tipo;
  // public status = {} as Status;

  constructor(
    private contaService: ContaService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.findConta();
  }

  public findConta() {
    this.contaService.findAll().subscribe((contaArray: Conta[]) => {
      this.contaArray = contaArray;
      this.total = contaArray.length;
    });
  }

  async openDialog(id: number): Promise<void> {
    let headerTitle = 'Inserir Conta';
    if(id > 0) headerTitle = 'Editar Conta';
    const data = {
      id: (id),
    };
    const dialogRef = this.dialog.open(ContaCadastroComponent, {
      width: '70%',
      dismissableMask: false,
      data,
      header: headerTitle
    }).onClose.subscribe(() => { this.findConta() });
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
    this.contaService.delete(this.contaDelete).subscribe((resultado) => {
      this.findConta();
      this.displayDeleteModal = false;
    })
  }

  mostrarDetalhes(array: any) {
    console.log(array);
    this.displayDetailsModal = true;
    this.conta = array;
  }
}
