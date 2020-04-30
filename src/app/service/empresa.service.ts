import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Empresa } from '../model/empresa';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl = 'http://localhost:8080/cadastro/empresa';

  constructor(private httpClient: HttpClient) { }

  public get(id: number): Observable<Empresa> {
    const getUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Empresa>(getUrl);
  }

  public save(empresa: Empresa): Observable<Empresa> {
    const postUrl = `${this.baseUrl}/criar`;
    return this.httpClient.post<Empresa>(postUrl, empresa);
  }

  public update(empresa: Empresa): Observable<Empresa> {
    const putUrl = `${this.baseUrl}/alterar`;
    return this.httpClient.put<Empresa>(putUrl, empresa);
  }

  public list(query: string, page: number, size: number): Observable<Page<Empresa>> {
    const getUrl = `${this.baseUrl}?query=${query}&page=${page}&size=${size}`;
    return this.httpClient.get<Page<Empresa>>(getUrl);
  }
  
public filtrar(nome: string, cnpj: string, page: number, size: number): Observable<Page<Empresa>> {
    const getUrl = `${this.baseUrl}/filtrar/?nome=${nome}&cnpj=${cnpj}&page=${page}&size=${size}`;
    return this.httpClient.get<Page<Empresa>>(getUrl);
  }
  
  public delete(id: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/excluir/${id}`;
    return this.httpClient.delete<any>(deleteUrl);
  }

}
