import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

import { Empresa } from '../../model/empresa';
import { Page } from '../../model/page';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

  text: string;
  
  nome: string;
  
  cnpj: string;

  pageNumber: number;

  pageSize: number;

  totalElements: number;

  page: Page<Empresa>;

  idToDelete: number;

  mensagem: string;

  @ViewChild('msg') msg:ElementRef;
  @ViewChild('content') content:ElementRef;

  constructor(private modalService: NgbModal, private empresaService: EmpresaService) { }

  public ngOnInit(): void {
    this.clear();
  }

  public list(): void {
    this.pageNumber = 0;
    this.doList();
  }
  
  public filtrar(): void {
    this.pageNumber = 0;
    this.doFilter();
  }

  public clear(): void {
    this.text = '';
    this.pageNumber = 0;
    this.pageSize = 10;
    this.doList();
  }

  public onPageChange(event: any): void {
    this.doList();
  }

  private doList(): void {
    const observable = this.empresaService.list(this.text, this.pageNumber, this.pageSize);
    observable.subscribe(
      page => {
        this.page = page;
        this.pageNumber = page.number;
        this.pageSize = page.size;
        this.totalElements = page.totalElements;
      },
      response => this.onError(response),
      () => console.log('Complete')
    );
  }

  public onConfirmDelete(item: Empresa): void {
    this.idToDelete = item.id;
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 'confirm') {
        this.onDelete();
      }
    }, (reason) => {
      console.log(reason);
    });
  }
  
   private doFilter(): void {
    console.log(this.nome);
     if(!this.nome && !this.cnpj){
      this.showDialog( "Informe o nome ou o CNPJ da empresa a ser pesquisada");
     }else{ 
      const observable = this.empresaService.filtrar(this.nome, this.cnpj, this.pageNumber, this.pageSize);
      observable.subscribe(
        page => {
          this.page = page;
          this.pageNumber = page.number;
          this.pageSize = page.size;
          this.totalElements = page.totalElements;
        },
        response => this.onError(response),
        () => console.log('Complete')
      );
      }
  }

  public onDelete() {
    this.empresaService.delete(this.idToDelete).subscribe(
      item => {
        this.onSuccess('Empresa excluída corretamente');
        this.doList();
      },
      response => this.onError(response),
      () => console.log('Complete')
    );
  }

  protected onSuccess(response: any) {
    let msg = 'Operação realizada corretamente';
    if (typeof response === 'string') {
      msg = response;
    } else if ((response) && (response.message)) {
      msg = response.message;
    } 
    this.showDialog( msg);
  }

  protected onError(response: Response | any) {
     console.log(JSON.stringify(response));

    let msg = 'Operação não foi realizada corretamente';
    if (typeof response === 'string') {
      msg = response;
    } else if ((response.error) && (response.error.message)) {
      msg = response.error.erros;
    } 

    this.showDialog( msg);
  }

  protected showDialog(msg: string) {
   this.mensagem = msg;
    this.modalService.open(this.msg, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 'confirm') {
        this.onDelete();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
