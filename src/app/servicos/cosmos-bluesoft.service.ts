import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CosmosBluesoftService {

  constructor(private http: HttpClient) { }


  obterHtmlCosmosBluesoft(valor: string): Observable<any> {
    console.log("Entrou");
    return this.http.get<any>('https://cosmos.bluesoft.com.br/ncms/' + valor);
  }



}
