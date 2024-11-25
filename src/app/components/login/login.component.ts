import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService, UserService } from '../../services';
import { Login, User } from '../../models';
import { ProgressService } from '../../services/progress.service';
import { UserRole } from '../../models/userRole';
import { ErrorModalComponent } from '../common/modal/error-modal/error-modal.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  isValidating: boolean = false;
  login:Login = {};
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService:UserService,
    private progessService : ProgressService,
    private router: Router,
    private modalService: ModalService,

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
      this.loginForm.markAllAsTouched();  
      return;
    }
    this.progessService.show();
    this.authService.login(this.login?.email, this.login?.senha).subscribe({
      next: (response) => {
          this.progessService.hide();
          this.userService.saveToken(response.message);
          this.userService.returnUser().subscribe((user:User) => {
            if(user.role == UserRole.funcionario) {
              this.router.navigate(["/inicio/funcionarios"])
            }else{
              this.router.navigate(["/inicio/clientes"])
            }
          })
      },
      error: (response) => {
        this.progessService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;%atilde;o.';
        
        if(response.error?.message)
          message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao cadastrar",
          body: `<p>${message}</p>`,
        });
        this.isValidating = false;
        this.isLoading = false;
      },
    });
  }
}
