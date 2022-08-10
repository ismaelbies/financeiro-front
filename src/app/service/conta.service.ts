import { Conta } from './../models/conta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private contaArray:Array<Conta> = [];
  private url = environment.urlApi + "/conta";
  private token: string = environment.token;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  insertHeaders() {
    return new HttpHeaders({'Authorization':'Basic ' .concat(this.token)});
   }

  findAll(): Observable<Conta[]> {
    const headers = this.insertHeaders();
    return this.httpClient.get<Conta[]>(this.url, {headers: headers});
  }

  findById(idConta: number): Observable<Conta> {
    const headers = this.insertHeaders();
    const urlWithId = this.url.concat(`/${idConta}`);
    return this.httpClient.get<Conta>(urlWithId, {headers: headers});
  }

  save(conta: Conta): Observable<Conta> {
    const headers = this.insertHeaders();
    return this.httpClient.post<Conta>(this.url, conta, {headers: headers});
  }

  update(conta: any): Observable<Conta> {
    const headers = this.insertHeaders();
    const urlUpdate = this.url.concat(`/${conta.idConta}`);
    return this.httpClient.put<Conta>(urlUpdate, conta, {headers: headers});
  }

  delete(conta: Conta): Observable<any> {
    const headers = this.insertHeaders();
    const urlDelete = this.url.concat(`/${conta.idConta}`);
    return this.httpClient.delete<Conta>(urlDelete, {headers: headers});
  }
}
