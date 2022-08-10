import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartaoCredito } from '../models/cartao-credito';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  private url = environment.urlApi + "/cartaocredito";
  private token: string = environment.token;

  constructor(private httpClient: HttpClient) { }

  insertHeaders() {
    return new HttpHeaders({'Authorization':'Basic ' .concat(this.token)});
   }

  findAll(): Observable<CartaoCredito[]> {
    const headers = this.insertHeaders();
    return this.httpClient.get<CartaoCredito[]>(this.url, {headers: headers});
  }

  findById(idCartaoCredito: number): Observable<CartaoCredito> {
    const headers = this.insertHeaders();
    const urlWithId = this.url.concat(`/${idCartaoCredito}`);
    return this.httpClient.get<CartaoCredito>(urlWithId, {headers: headers});
  }

  save(cartaoCredito: CartaoCredito): Observable<CartaoCredito> {
    const headers = this.insertHeaders();
    return this.httpClient.post<CartaoCredito>(this.url, cartaoCredito, {headers: headers});
  }

  update(cartaoCredito: CartaoCredito): Observable<CartaoCredito> {
    const headers = this.insertHeaders();
    const urlUpdate = this.url.concat(`/${cartaoCredito.idCartaoCredito}`);
    return this.httpClient.put<CartaoCredito>(urlUpdate, cartaoCredito, {headers: headers});
  }

  delete(cartaoCredito: CartaoCredito): Observable<CartaoCredito> {
    const headers = this.insertHeaders();
    const urlDelete = this.url.concat(`/${cartaoCredito.idCartaoCredito}`);
    return this.httpClient.delete<CartaoCredito>(urlDelete, {headers: headers});
  }
}
