import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaEditComponent } from './component/empresa-edit/empresa-edit.component';
import { EmpresaListComponent } from './component/empresa-list/empresa-list.component';
import { UploadComponent } from './component/upload/empresa-upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/empresa', pathMatch: 'full' },
  { path: 'empresa', component: EmpresaListComponent },
  { path: 'empresa/edit', component: EmpresaEditComponent },
  { path: 'empresa/edit/:id', component: EmpresaEditComponent },
  { path: 'empresa/upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 