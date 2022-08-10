import { ContaCorrente } from './../models/conta-corrente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaCorrenteService {

  private contaCorrenteArray:Array<ContaCorrente> = [];
  private url = environment.urlApi + "/contacorrente";
  private token: string = environment.token;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  insertHeaders() {
    return new HttpHeaders({'Authorization':'Basic ' .concat(this.token)});
   }

  findAll(): Observable<ContaCorrente[]> {
    const headers = this.insertHeaders();
    return this.httpClient.get<ContaCorrente[]>(this.url, {headers: headers});
  }

  findById(idContaCorrente: number): Observable<ContaCorrente> {
    const headers = this.insertHeaders();
    const urlWithId = this.url.concat(`/${idContaCorrente}`);
    return this.httpClient.get<ContaCorrente>(urlWithId, {headers: headers});
  }

  save(contaCorrente: ContaCorrente): Observable<ContaCorrente> {
    const headers = this.insertHeaders();
    return this.httpClient.post<ContaCorrente>(this.url, contaCorrente, {headers: headers});
  }

  update(contaCorrente: any): Observable<ContaCorrente> {
    const headers = this.insertHeaders();
    const urlUpdate = this.url.concat(`/${contaCorrente.idContaCorrente}`);
    return this.httpClient.put<ContaCorrente>(urlUpdate, contaCorrente, {headers: headers});
  }

  delete(contaCorrente: ContaCorrente): Observable<any> {
    const headers = this.insertHeaders();
    const urlDelete = this.url.concat(`/${contaCorrente.idContaCorrente}`);
    return this.httpClient.delete<ContaCorrente>(urlDelete, {headers: headers});
  }
}
