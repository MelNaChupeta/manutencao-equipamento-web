import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, 
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  signupForm: FormGroup;
  isValidating: boolean = false; 
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private clienteService: ClienteService,
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
      return;
    }

    this.isValidating = true;
    this.isLoading = true;

    const user = this.signupForm.value;

    this.clienteService.signup(user.cpf, user.nome, user.email, user.celular, user.cep, user. endereco, user.bairro, user.cidade, user.estado).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isValidating = false;
          this.isLoading = false;
          this.router.navigate(['/']);
        }, 3000);
      },

      error: (error) => {
        this.isValidating = false;
        this.isLoading = false;
        this.router.navigate(['/']);

        let message = 'Ocorreu um erro ao processar a requisi&ccedil;%atilde;o.';

      }
    });
  }

}
