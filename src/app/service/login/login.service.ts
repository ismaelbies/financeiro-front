import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = "http://localhost:8083/api/financeiro/conta";
  private token: string = "eyJjb2RpZ28iOjQzNzYsIm5vbWUiOiJMb2dpbiAiLCJsb2dpbiI6ImVhc3kuZXN0YW5jaWEiLCJwZXJmaWwiOiIwIiwiZW1wcmVzYSI6eyJjb2RpZ28iOjExMTUsIm5vbWUiOiJKUyBFTVBSRUVORElNRU5UT1MgSU1PQklMSUFSSU9TIExUREEiLCJmYW50YXNpYSI6IkpTIEVNUFJFRU5ESU1FTlRPUyBJTU9CSUxJQVJJT1MgTFREQSIsImNucGoiOiIxMC43NTcuNjg2LzAwMDEtMTMiLCJ0ZWxlZm9uZSI6Iig2NykgOTk5NjUtMDEwMiIsImVuZGVyZWNvIjoiQVZFTklEQSBKQU1JTCBKT1JHRSBTQUxPTUFPLCA5OTkiLCJiYWlycm8iOiJQT1JUQUwgREFTIEFSQVJBUyIsImNpZGFkZSI6IlRSRVMgTEFHT0FTIiwiY2VwIjoiNzk2NDQtMDAwIiwiZW1haWwiOiJqb2FxdWltQG5vdmFlc3RyZWxhLm5ldCIsInVmIjoiTVMiLCJ0aXBvU2lzdGVtYSI6IlBPUlRBTFBPU1RBTCJ9LCJiYW5jb0RhZG9zIjoiNzc3Nzc3Nzc3Nzc3NzcifQ";
  public urlIntegracao: any;
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
   }

  login() {
  const accessUrl = this.url + "?token=" + this.token;

    // req = req.clone({
    //   setHeaders: {
    //     Authorization: 'Basic '.concat(this.financeiroIntegradoService.getTokenFinanceiro())
    //   });
    const headers = new HttpHeaders({'Authorization':'Basic ' .concat(this.token)});
    const a = this.httpClient.get(accessUrl, {headers: headers});
    // this.urlIntegracao = this.sanitizer.bypassSecurityTrustResourceUrl(accessUrl);
    // console.log(this.urlIntegracao);
    console.log(a);
    return a;
    // localStorage.setItem('','');
  }


  // a() {
    // let pathUrl = '/easy'.concat(this.router.url);
    // const url = environment.apiUrlFinanceiro.concat(pathUrl).concat('?token=').concat(this.tokenFinanceiroService.getTokenFinanceiro());
    // console.log(url);
    // this.urlIntegracao = this.sanitizer.bypassSecurityTrustResourceUrl(url);
     // const url = environment.apiUrlFinanceiro.concat(pathUrl);
      //this.urlIntegracao = this.sanitizer.bypassSecurityTrustResourceUrl(url + '?token=eyJjb2RpZ28iOjE2MDksIm5vbWUiOiJMb2dpbiIsImxvZ2luIjoiZWFzeS5kZW1vIiwicGVyZmlsIjoiMCIsImVtcHJlc2EiOnsiY29kaWdvIjoxMDAyLCJub21lIjoiTWFyaW5hIERlbW8iLCJmYW50YXNpYSI6Ik1hcmluYSBEZW1vIiwiY25waiI6Ijc3Ljc3Ny43NzcvNzc3Ny03NyIsInRpcG9TaXN0ZW1hIjoiUE9SVEFMUE9TVEFMIn0sImJhbmNvRGFkb3MiOiI3Nzc3Nzc3Nzc3Nzc3NyJ9');

  // }
}
