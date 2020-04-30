import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  } from '@angular/localize';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaEditComponent } from './component/empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './component/empresa-list/empresa-list.component';
import { EmpresaService } from './service/empresa.service';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaEditComponent,
    EmpresaListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
