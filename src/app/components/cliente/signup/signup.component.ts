import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViaCepService } from '../../../services';
import { ClienteService } from '../../../services/cliente.service';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ProgressService } from '../../../services/progress.service';
import { ModalService } from '../../../services/modal.service';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';
import { Client } from '../../../models';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    NgxMaskDirective, 
    NgxMaskPipe,
    FontAwesomeModule,
    RouterModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit{
  signupForm: FormGroup;
  isValidating: boolean = false; 
  isLoading: boolean = false;
  loadingCep:boolean = false;
  faLoading:IconDefinition = faCircleNotch;
  cliente:Client = {};
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private viaCepService: ViaCepService,
    private progressBarService: ProgressService,
    private modalService: ModalService,
    private router: Router){
      this.signupForm = this.fb.group({
        cpf: ['', [Validators.required]],
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        celular: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        endereco: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      });
  }
  ngOnInit(): void {
    this.signupForm.get("cep")?.valueChanges.pipe(
      
      switchMap(value => {
        this.loadingCep = true;
        if (value && value.length === 8) {
          this.loadingCep = true;
          return this.viaCepService.getAddress(value).pipe(
            catchError(() => of({ erro: true }))
          );
        }
        return of(null);
      })
    ).subscribe(data => {
      this.loadingCep = false;
      if (data && !data.erro) {
        this.cliente.endereco = data.logradouro
        this.cliente.cidade = data.localidade
        this.cliente.uf = data.uf
        this.cliente.bairro = data.bairro
      }
    });
  }

  get cpf(){
    return this.signupForm.get('cpf');
  }

  get nome(){
    return this.signupForm.get('nome');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get celular(){
    return this.signupForm.get('celular');
  }

  get cep(){
    return this.signupForm.get('cep');
  }

  get endereco(){
    return this.signupForm.get('endereco');
  }

  get bairro(){
    return this.signupForm.get('bairro');
  }

  get cidade(){
    return this.signupForm.get('cidade');
  }

  get estado(){
    return this.signupForm.get('estado');
  }

  async onSubmit(){
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();  
      return;
    }

    this.isValidating = true;
    this.isLoading = true;
    this.progressBarService.show();

    this.clienteService.signup(this.cliente).subscribe({
      next: (response) => {
          this.progressBarService.hide();
          this.isValidating = false;
          this.isLoading = false;
          this.modalService.open(AlertModalComponent, {
            title:"Cadastro realizado com sucesso",
            body:`<p>Um email foi enviado para <u><b>${this.cliente.email}</b></u> contendo a sua senha</p>`,
            onClose: () => {
              this.router.navigate(["/login/"]);
              
            },
          });      
      },

      error: (error) => {
        this.progressBarService.hide();
        this.isValidating = false;
        this.isLoading = false;
        this.router.navigate(['/']);
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;%atilde;o.';

      }
    });
  }

}
