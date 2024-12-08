import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { faCircleNotch, faPencilSquare, faTrash , faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { TabelaComponent } from '../../common/estilo-tabela/estilo-tabela.component';
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { ProgressService } from '../../../services/progress.service';

@Component({
  selector: 'app-listar-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule,
    TabelaComponent,
    RouterModule
  ],
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.scss'
})
export class ListarCategoriaComponent  implements OnInit{
  
  isLoading:boolean = false;
  loadingCategoria:boolean = false;
  faLoading:IconDefinition = faCircleNotch;
  faPencil:IconDefinition  = faPencilSquare;
  faTrash:IconDefinition  = faTrash;
  faPlus:IconDefinition  = faPlus;
  isModalOpen = false;
  categoria:Categoria = {};
  categorias:Categoria[] = [];

  colunas:any[] = [
    { titulo: 'NOME', campo: 'nome' },
  ];

  buttons = [
    { body: `<i class="fa-solid fa-pen-to-square"></i>`, class: 'text-3xl text-green  text-green-700', action: this.editar.bind(this) },
    { body: `<i class="fa-solid fa-trash"></i>`, class: 'text-3xl text-red text-red-700', action: this.excluir.bind(this) }
  ];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private progressBarService: ProgressService,
    private modalService:ModalService){
    
  }
  ngOnInit(): void {
    this.listar();
  }

  excluir(item:Categoria):void {
    this.isModalOpen = true;
    this.categoria = item;
    this.modalService.open(ConfirmModalComponent, {
      title:"Confirmar Ação",
      body:"tem certeza que deseja excluir esse item ?",
      onClose: () => {
        console.log('Modal closed');
      },
      onConfirm: () => {
        this.onDeleteModalConfirm(item?.id)
      }
    });
  }

  editar(item?:Categoria){
    this.router.navigate(["/categoria/editar/"+item?.id], {relativeTo:this.route});
  }
  
  novaCategoria() {
    this.router.navigate(["/categoria/cadastrar"]);
  }

  listar() {
     this.progressBarService.show();
     this.categoriaService.findAll().subscribe({
      next: (response) => {
          this.progressBarService.hide();
          this.isLoading = false;
          this.categorias = response;
      },
      error: (error) => {
        this.progressBarService.hide();
        this.isLoading = false;
        this.modalService.open(ErrorModalComponent, {
          title:"Atenção",
          body:"Erro ao buscar categorias"
        });  
      }
    });
  }

  onDeleteModalConfirm(id?:number) {
    this.isModalOpen = false;
    this.progressBarService.show();
    this.categoriaService.delete(id).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.listar();
      }, error: (response) => {
        this.progressBarService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
          message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao remover categoria",
          body: `<p>${message}</p>`,
        });
      }
    });
  }

  
}
