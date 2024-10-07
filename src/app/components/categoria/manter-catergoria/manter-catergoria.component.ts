import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manter-catergoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule
  ],
  templateUrl: './manter-catergoria.component.html',
  styleUrl: './manter-catergoria.component.scss'
})
export class ManterCatergoriaComponent {
  categoriaForm: FormGroup;
  isValidating: boolean = false; 
  isLoading: boolean = false;
  loadingCep:boolean = false;
  loadingCategoria:boolean = false;
  faLoading:IconDefinition = faCircleNotch;
  faPencil:IconDefinition  = faPencilSquare;
  faTrash:IconDefinition  = faTrash;
  idCategoria!:number;
  


  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
        this.idCategoria = params['id'] as number;
        this.loadingCategoria = true;
        this.findById(this.idCategoria)
    });
    this.categoriaForm = this.fb.group({
        nome: ['', [Validators.required]],
        id: [null]
    });
  }

  get nome(){
    return this.categoriaForm.get('nome');
  }

   onSubmit(){
    if (this.categoriaForm.invalid) {
      return;
    }

    this.isValidating = true;
    this.isLoading = true;

    const categoria:Categoria = this.categoriaForm.value;
    if(this.idCategoria) {
      categoria.id = this.idCategoria;
      this.editar(categoria);
    }
  }

  editar(categoria:Categoria) {
    this.categoriaService.update(categoria).subscribe({
      next: (response) => {
          this.isValidating = false;
          this.isLoading = false;
      },
      error: (error) => {
        this.isValidating = false;
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });
  }

  findById(id:number) {
    this.loadingCategoria = true;
    this.categoriaService.findById(id).subscribe({
      next: (response) => {
          this.loadingCategoria = false;
          this.categoriaForm.patchValue({
            id: response.id,
            nome: response.nome,
          });
      },
      error: (error) => {
        this.isValidating = false;
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });
  }
}
