import { LoginService } from './service/login/login.service';
import { FormaPagamento } from './models/forma-pagamento';
import { Component, Output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {FieldsetModule} from 'primeng/fieldset';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent {

  constructor(private loginService: LoginService) {
  }

  public login() {
    this.loginService.login().subscribe(resultado => {
      // localStorage.setItem('user', resultado);
      // localStorage.setItem('usuario',resultado.usuario);
    });
  }
}
