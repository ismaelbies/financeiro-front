import { FormaPagamento } from './../models/forma-pagamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  private formaPagamentoArray:Array<FormaPagamento> = [];
  private url = environment.urlApi + "/tipo/formapagamento";
  private token: string = environment.token;


  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
   }

   insertHeaders() {
    return new HttpHeaders({'Authorization':'Basic ' .concat(this.token)});
   }

  findFormaPagamento(): Observable<FormaPagamento[]> {
    const headers = this.insertHeaders();
    return this.httpClient.get<FormaPagamento[]>(this.url, {headers: headers});
  }

  findAll(): Observable<FormaPagamento[]> {
    const headers = this.insertHeaders();
    return this.httpClient.get<FormaPagamento[]>(this.url, {headers: headers});
  }

  findFormaPagamentoById(idTipoFormaPagamento: number): Observable<FormaPagamento> {
    const headers = this.insertHeaders();
    const urlWithId = this.url.concat(`/${idTipoFormaPagamento}`);
    return this.httpClient.get<FormaPagamento>(urlWithId, {headers: headers});
  }

  save(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    const headers = this.insertHeaders();
    return this.httpClient.post<FormaPagamento>(this.url, formaPagamento, {headers: headers});
  }

  update(formaPagamento: any): Observable<FormaPagamento> {
    const headers = this.insertHeaders();
    const urlUpdate = this.url.concat(`/${formaPagamento.idTipoFormaPagamento}`);
    return this.httpClient.put<FormaPagamento>(urlUpdate, formaPagamento, {headers: headers});
  }

  delete(formaPagamento: FormaPagamento): Observable<any> {
    const headers = this.insertHeaders();
    const urlDelete = this.url.concat(`/${formaPagamento.idTipoFormaPagamento}`);
    return this.httpClient.delete<FormaPagamento>(urlDelete, {headers: headers});
  }
}
