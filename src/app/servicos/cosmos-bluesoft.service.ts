import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CosmosBluesoftService {

  constructor(private http: HttpClient) { }


  obterHtmlCosmosBluesoft(code: string): Observable<any> {
    console.log("Entrou");
    return this.http.get<any>('http://localhost:8080/produtos/' + code);
  }



}
