import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilSquare  , faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
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
    if(this.idCategoria) {
      this.cadastrar(categoria);
    }else{
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

  excluir(id:number):void {
    this.categoriaService.delete(id).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isValidating = false;
          this.isLoading = false;
        }, 3000);
      },
      error: (error) => {
        this.isValidating = false;
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });
  }
  
  goEditar(id:number){
    this.router.navigate(["/categoria/"+id]);
  }

}
