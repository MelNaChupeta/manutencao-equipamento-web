import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from '../../commom/modal/alert-modal/alert-modal.component';
import { ErrorModalComponent } from '../../commom/modal/error-modal/error-modal.component';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';

@Component({
  selector: 'app-manter-catergoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule,
    RouterModule
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
  categoria:Categoria = {};


  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private modalService: ModalService,
    private progressBarService: ProgressService,
    private route: ActivatedRoute){
    this.categoriaForm = this.fb.group({
        nome: ['', [Validators.required]],
        id: [null]
    });
    this.route.paramMap.subscribe(params => {
        let idCategoria = params.get('idCategoria');
        if(idCategoria){
          this.idCategoria = parseInt(idCategoria);
        }
        this.loadingCategoria = true;
        this.findById(this.idCategoria)
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
    this.progressBarService.show();
    this.isValidating = true;
    this.isLoading = true;

    const categoria:Categoria = this.categoriaForm.value;
    if(this.idCategoria) {
      categoria.id = this.idCategoria;
      this.editar(categoria);
    }
  }

  editar(categoria:Categoria) {
    this.categoriaService.update(categoria)
    this.categoriaService.register(categoria).subscribe(
         (response) => {
            this.progressBarService.hide();
            this.isLoading = false;
            this.modalService.open(AlertModalComponent, {
              title:"Sucesso",
              body:"Categoria alterada com sucesso",
              onClose: () => {
                this.router.navigate(["/categorias/"]);
                
              },
            });      
        },
         (error) => {
          this.progressBarService.hide();
          this.isLoading = false;
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

  findById(id:number) {
    this.loadingCategoria = true;
    this.progressBarService.show();
    this.categoriaService.findById(id).subscribe(
       (response) => {
          this.progressBarService.hide();
          this.loadingCategoria = false;
          if(response) {
            this.categoria = response;
          }else{
            this.modalService.open(ErrorModalComponent, {
              title:"Atenção",
              body:"Erro ao buscar categoria"
            });
          }
      },
      (error) => {
        this.progressBarService.hide();
        this.isValidating = false;
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
        this.modalService.open(ErrorModalComponent, {
          title:"Atenção",
          body:message
        });
      }
    );
   
  }
}
