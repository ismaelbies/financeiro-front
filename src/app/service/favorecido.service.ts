import { Favorecido } from './../models/favorecido';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class FavorecidoService {

  private contaArray:Array<Favorecido> = [];
  private url = environment.urlApi + "/favorecido";
  private token: string = environment.token;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  insertHeaders() {
    return new HttpHeaders({'Authorization':'Basic ' .concat(this.token)});
   }

  findAll(): Observable<Favorecido[]> {
    const headers = this.insertHeaders();
    return this.httpClient.get<Favorecido[]>(this.url, {headers: headers});
  }

  findById(idFavorecido: number): Observable<Favorecido> {
    const headers = this.insertHeaders();
    const urlWithId = this.url.concat(`/${idFavorecido}`);
    return this.httpClient.get<Favorecido>(urlWithId, {headers: headers});
  }

  save(favorecido: Favorecido): Observable<Favorecido> {
    const headers = this.insertHeaders();
    return this.httpClient.post<Favorecido>(this.url, favorecido, {headers: headers});
  }

  update(favorecido: any): Observable<Favorecido> {
    const headers = this.insertHeaders();
    const urlUpdate = this.url.concat(`/${favorecido.idFavorecido}`);
    return this.httpClient.put<Favorecido>(urlUpdate, favorecido, {headers: headers});
  }

  delete(favorecido: Favorecido): Observable<any> {
    const headers = this.insertHeaders();
    const urlDelete = this.url.concat(`/${favorecido.idFavorecido}`);
    return this.httpClient.delete<Favorecido>(urlDelete, {headers: headers});
  }
}
