import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nova-catergoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule
  ],
  templateUrl: './nova-catergoria.component.html',
  styleUrl: './nova-catergoria.component.scss'
})
export class NovaCatergoriaComponent {
  categoriaForm: FormGroup;
  isValidating: boolean = false; 
  isLoading: boolean = false;
  loadingCep:boolean = false;
  loadingCategoria:boolean = false;
  faLoading:IconDefinition = faCircleNotch;
  faPencil:IconDefinition  = faPencilSquare;
  faTrash:IconDefinition  = faTrash;
  idCategoria!:number;
  categorias:Categoria[] = [
    { nome: 'notebook', id: 10 },
    { nome: 'desktop', id: 9  },
    { nome: 'celular', id: 8 },
    { nome: 'tablet', id: 7 },
    { nome: 'periferico', id: 6 },
    { nome: 'camera', id: 5 },
    { nome: 'televisao', id: 4 },
    { nome: 'drone', id : 3},
    { nome: 'videogameConsole', id:2},
    { nome: 'videogameAcessorio', id : 1 },
  ];


  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
        this.idCategoria = params['id'];
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
    this.cadastrar(categoria);
  }
  cadastrar(categoria:Categoria) {
    this.categoriaService.register(categoria).subscribe({
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
}
