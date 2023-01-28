import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bluesoft } from '../bluesoft';

const API_URL = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class CosmosBluesoftService {

  constructor(private http: HttpClient) { }


  obterHtmlCosmosBluesoft(code: string): Observable<Bluesoft> {
    console.log("Entrou");
    return this.http.get<Bluesoft>(API_URL + '/produtos/' + code);
  }



}
