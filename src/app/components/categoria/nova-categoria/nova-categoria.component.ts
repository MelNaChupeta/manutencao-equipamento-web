import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { ProgressBarComponent } from '../../common/progress-bar/progress-bar.component';
import { ProgressService } from '../../../services/progress.service';

@Component({
  selector: 'app-nova-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule,
    ProgressBarComponent,
    RouterModule
  ],
  templateUrl: './nova-categoria.component.html',
  styleUrl: './nova-categoria.component.scss'
})
export class NovaCategoriaComponent {
  categoriaForm: FormGroup;
  categoria:Categoria = {};
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
    private modalService: ModalService,
    private progressBarService: ProgressService,
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
      this.categoriaForm.markAllAsTouched();  
      return;
    }

    this.isLoading = true;
    this.progressBarService.show();
    this.cadastrar(this.categoria);
  }

  cadastrar(categoria:Categoria) {
      this.categoriaService.register(categoria).subscribe(
          (response) => {
             this.isLoading = false;
             this.progressBarService.hide();

             this.modalService.open(AlertModalComponent, {
               title:"Sucesso",
               body:"Categoria alterada com sucesso",
               onClose: () => {
                 this.router.navigate(["/categorias/listar"]);
                 
               },
             });      
         },
          (error) => {
           this.isLoading = false;
           this.progressBarService.hide();

           this.modalService.open(ErrorModalComponent, {
             title:"Atenção",
             body:"Erro ao alterar categoria"
           });      
         }
    );  
              
   /*.subscribe({
      next: (response) => {
          this.isValidating = false;
          this.isLoading = false;
      },
      error: (error) => {
        this.isValidating = false;
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });*/
  }
}
