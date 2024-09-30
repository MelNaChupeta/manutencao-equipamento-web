import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule 
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  categoriaForm: FormGroup;
  isValidating: boolean = false; 
  isLoading: boolean = false;
  loadingCep:boolean = false;
  faLoading:IconDefinition = faCircleNotch;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router){
      this.categoriaForm = this.fb.group({
        nome: ['', [Validators.required]]
      });
  }

  get nome(){
    return this.categoriaForm.get('nome');
  }

  async onSubmit(){
    if (this.categoriaForm.invalid) {
      return;
    }

    this.isValidating = true;
    this.isLoading = true;

    const categoria = this.categoriaForm.value;

    this.categoriaService.register(categoria).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isValidating = false;
          this.isLoading = false;
        }, 3000);
      },
      error: (error) => {
        this.isValidating = false;
        this.isLoading = false;
        this.router.navigate(['/']);
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });
  }
}
