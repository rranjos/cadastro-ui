import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Cep } from '../model/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private baseUrl = 'http://viacep.com.br/ws';

  constructor(private httpClient: HttpClient) { }

  public get(cep: string): Observable<Cep> {
    const getUrl = `${this.baseUrl}/${cep}/json`;
    return this.httpClient.get<Cep>(getUrl);
  }

}
