import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  isValidating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isValidating = true;
    this.isLoading = true;

    const user = this.loginForm.value;

    this.authService.login(user.email, user.password).subscribe({
      next: (response) => {
          this.isLoading = false;
          this.isValidating = false;
          this.userService.saveToken(response.message);
          this.router.navigate(["/home"])
      },
      error: (error) => {
        this.isLoading = false;
        this.isValidating = false;
        this.router.navigate(['/home']);

        let message =
          'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';

        if (error.status === 400) {
          message = 'Email ou senha inv&aacute;lidos.';
        } else if (error.status === 500 || error.status === 504) {
          message = 'Erro interno do servidor, tente novamente mais tarde.';
        } else if (error.status === 401) {
          message = 'Acesso n&atilde;o autorizado.';
        }
      },
    });
  }
}
