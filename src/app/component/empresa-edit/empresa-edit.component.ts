import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

import { Cep } from '../../model/cep';
import { Empresa } from '../../model/empresa';
import { CepService } from '../../service/cep.service';
import { EmpresaService } from '../../service/empresa.service';
import { CustomValidators } from 'src/app/validator/CustomValidators';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.scss']
})
export class EmpresaEditComponent implements OnInit {

  id: number;

  form: FormGroup;

  mensagem: string;

  @ViewChild('msg') msg:ElementRef;
  @ViewChild('content') content:ElementRef;

  readonly formErrors = {
    telefone: '',
    cnpj: '',
    tipo: '',
    nome: '',
    razaoSocial: '',
    email: '',
    cep: '',
    estado: '',
    bairro: '',
    cidade: '',
    logradouro: '',
    complemento: ''
  };

  readonly validationMessages = {
    cnpj: {
      required:      'O CNPJ deve ser informado',
      minlength:     'O CNPJ deve ter pelo menos 14 caracteres',
      maxlength:     'O CNPJ não pode ter mais de 14 caracteres',
      cnpj:          'O CNPJ informado inválido'
    },
    tipo: {
      required:      'O tipo deve ser selecionado'
    },
    nome: {
      required:      'O nome o deve ser informado',
      minlength:     'O nome deve ter pelo menos 2 caracteres',
      maxlength:     'O nome não pode ter mais de 100 caracteres'
    },
    razaoSocial: {
      required:      'A razão social o deve ser informado',
      minlength:     'A razão social deve ter pelo menos 3 caracteres',
      maxlength:     'A razão social não pode ter mais de 100 caracteres'
    },
    telefone: {
      required:      'O telefone o deve ser informado',
      minlength:     'O nomtelefone deve ter pelo menos 7 caracteres',
      maxlength:     'O nome não pode ter mais de 20 caracteres'
    },
    email: {
      required:      'O email o deve ser informado',
      minlength:     'O email deve ter pelo menos 3 caracteres',
      maxlength:     'O email não pode ter mais de 100 caracteres',
      email:         'O email não é válido'
    },
    cep: {
      required:      'O cep o deve ser informado',
      minlength:     'O cep deve ter pelo menos 8 caracteres',
      maxlength:     'O cep não pode ter mais de 8 caracteres'
    },
    estado: {
      required:      'O estado o deve ser selecionado'
    },
    bairro: {
      required:      'O bairro o deve ser informado',
      minlength:     'O bairro deve ter pelo menos 3 caracteres',
      maxlength:     'O bairro não pode ter mais de 100 caracteres'
    },
    cidade: {
      required:      'A cidade o deve ser informado',
      minlength:     'A cidade deve ter pelo menos 3 caracteres',
      maxlength:     'A cidade não pode ter mais de 100 caracteres'
    },
    logradouro: {
      required:      'O logradouro o deve ser informado',
      minlength:     'O logradouro deve ter pelo menos 3 caracteres',
      maxlength:     'O logradouro não pode ter mais de 100 caracteres'
    },
    complemento: {
      required:      'O complemento o deve ser informado',
      minlength:     'O complemento deve ter pelo menos 3 caracteres',
      maxlength:     'O complemento não pode ter mais de 100 caracteres'
    }
  };

  constructor(protected route: ActivatedRoute, protected router: Router, protected modalService: NgbModal,
              private fb: FormBuilder, private empresaService: EmpresaService,  private cepService: CepService) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          const id: number = parseInt(params['id'], 10);
          this.empresaService.get(id).subscribe(
            item => {
              this.id = id;
              this.buildForm();
              this.form.setValue(item);
              this.form.markAsTouched();
            },
            response => this.onError(response),
            () => console.log('Complete')
          );
        } else {
          this.buildForm();
        }
      }
    );
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      cnpj: ['', [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
          CustomValidators.cnpj
        ]
      ],
      tipo: ['', [
          
          Validators.minLength(1),
          Validators.maxLength(10)
        ]
      ],
      nome: ['', [
        
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      razaoSocial: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      telefone: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20)
        ]
      ],
      email: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.email
        ]
      ],
      cep: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9)
        ]
      ],
      estado: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2)
        ]
      ],
      bairro: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      cidade: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      logradouro: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      complemento: ['', [
          Validators.minLength(1),
          Validators.maxLength(100)
        ]
      ]
    });

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if (!this.form) {
      return;
    }
    this.doValueChanged(this.form, this.formErrors, this.validationMessages);
  }

  protected doValueChanged(form: FormGroup, errors: any, messages: any) {
    if (!form) {
      return;
    }

    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        const control = form.get(field);
        errors[field] = '';

        if (control && control.dirty && !control.valid) {
          const fieldMessages = messages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              if (fieldMessages[key]) {
                errors[field] += fieldMessages[key] + ' ';
              } else {
                errors[field] += key + ' ';
              }
            }
          }
        }
      }
    }
  }

   public onClickCep(): void {
    const cepStr = this.form.controls['cep'].value;
    if (cepStr) {
      this.cepService.get(cepStr).subscribe(
        item => {
          this.form.controls['cep'].setValue(item.cep);
          this.form.controls['estado'].setValue(item.uf);
          this.form.controls['bairro'].setValue(item.bairro);
          this.form.controls['cidade'].setValue(item.localidade);
          this.form.controls['logradouro'].setValue(item.logradouro);
          this.form.controls['complemento'].setValue('');
        },
        response => {
          this.form.controls['estado'].setValue('');
          this.form.controls['bairro'].setValue('');
          this.form.controls['cidade'].setValue('');
          this.form.controls['logradouro'].setValue('');
          this.form.controls['complemento'].setValue('');
        },
        () => console.log('Complete')
      );
    }
  }

  public onSubmit(): void {
    const empresa: Empresa = this.form.value;
console.log(empresa);
    let observable: Observable<Empresa>;
    if (this.id) {
      observable = this.empresaService.update(empresa);
    } else {
      observable = this.empresaService.save(empresa);
    }
    observable.subscribe(
      item => {
        //this.onSuccess(item);
        //this.id = item.id;
        //this.buildForm();
        //this.form.setValue(item);
        //this.form.markAsTouched();
        this.router.navigate(['/empresa']);
      },
      response => this.onError(response),
     // () => console.log(response)
    );
  }

   protected onError(response: Response | any) {
    let msg = 'Operação não foi realizada corretamente';
    if (typeof response === 'string') {
      msg = response;
    } else if ((response.error) && (response.error.message)) {
      msg = response.error.resume;
    } 

    this.showDialog( msg);
  }

  protected showDialog(msg: string) {
    this.mensagem = msg;
     this.modalService.open(this.msg, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
     }, (reason) => {
       console.log(reason);
     });
    }
  

}
