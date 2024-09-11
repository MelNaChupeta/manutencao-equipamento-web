import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'signup',
  template: `
    <div class="main-content-container">
      <h1>Cadastro</h1>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class SignupComponent {}