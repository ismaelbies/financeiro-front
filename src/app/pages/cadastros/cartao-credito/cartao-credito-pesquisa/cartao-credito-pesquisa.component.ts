import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CartaoCredito } from 'src/app/models/cartao-credito';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';
import { CartaoCreditoCadastroComponent } from '../cartao-credito-cadastro/cartao-credito-cadastro.component';

@Component({
  selector: 'app-cartao-credito-pesquisa',
  templateUrl: './cartao-credito-pesquisa.component.html',
  styleUrls: ['./cartao-credito-pesquisa.component.sass']
})
export class CartaoCreditoPesquisaComponent implements OnInit {

  public cartaoCreditoArray: CartaoCredito[] = [];
  public array = [];
  public total: number = 0;
  public displayDeleteModal: boolean = false;
  public displayDetailsModal: boolean = false;
  public title = 'Cartão Créditos';
  public detailsModalTitle = 'Visualizar Cartão de Crédito';
  public cartaoCreditoDelete = {} as any;
  public cartaoCredito = {} as CartaoCredito;

  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private dialog: DialogService
    ) { }

  ngOnInit(): void {
    this.findCartaoCredito();
  }

  public findCartaoCredito() {
    this.cartaoCreditoService.findAll().subscribe((cartaoCreditoArray: CartaoCredito[]) => {
      this.cartaoCreditoArray = cartaoCreditoArray;
      this.total = cartaoCreditoArray.length;
    });
  }

  async openDialog(id: number): Promise<void> {
    let headerTitle = 'Inserir Cartão Crédito';
    if(id > 0) headerTitle = 'Editar Conta Corrente';
    const data = {
      id: (id),
    };
    const dialogRef = this.dialog.open(CartaoCreditoCadastroComponent, {
      width: '60%',
      dismissableMask: false,
      data,
      header: headerTitle
    }).onClose.subscribe(() => { this.findCartaoCredito() });
  }

  deleteRow(array: CartaoCredito) {
    this.cartaoCreditoDelete = array;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  closeDetailsModal() {
    this.displayDetailsModal = false;
  }

  deleteCartaoCredito() {
    this.cartaoCreditoService.delete(this.cartaoCreditoDelete).subscribe((resultado) => {
      this.findCartaoCredito();
      this.displayDeleteModal = false;
    })
  }

  mostrarDetalhes(array: any) {
    this.displayDetailsModal = true;
    this.cartaoCredito = array;
  }
}
