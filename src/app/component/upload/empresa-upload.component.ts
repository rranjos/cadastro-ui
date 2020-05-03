import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './empresa-upload.component.html',
  styleUrls: ['./empresa-upload.component.scss']
})

export class UploadComponent {



  
    public ngOnInit(): void {

      console.log('Complete')
        
      }

      constructor(private httpClient: HttpClient) { }
      selectedFile: File;
      retrievedArquivo: any;
      base64Data: any;
      retrieveResonse: any;
      message: string;
      arquivoName: any;

      public onFileChanged(event) {
        this.selectedFile = event.target.files[0];
      }

      onUpload() {
        console.log(this.selectedFile);
        
        const uploadArquivo = new FormData();
        uploadArquivo.append('arquivo', this.selectedFile, this.selectedFile.name);
      
        this.httpClient.post('http://localhost:8080/cadastro/empresa/upload', uploadArquivo, { observe: 'response' })
          .subscribe((response) => {
            if (response.status === 200) {
              this.message = 'Arquivo carregado com sucesso';
            } else {
              this.message = 'O arquivo não foi carregado com sucesso';
            }
          }
          );
      }
    
}