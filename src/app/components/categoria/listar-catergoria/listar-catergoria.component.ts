import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { faCircleNotch, faPencilSquare, faTrash , faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { TabelaComponent } from '../../estilo-tabela/estilo-tabela.component';
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../../commom/modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-listar-catergoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule,
    TabelaComponent,
    RouterModule
  ],
  templateUrl: './listar-catergoria.component.html',
  styleUrl: './listar-catergoria.component.scss'
})
export class ListarCatergoriaComponent  implements OnInit{
  
  isLoading:boolean = false;
  loadingCategoria:boolean = false;
  faLoading:IconDefinition = faCircleNotch;
  faPencil:IconDefinition  = faPencilSquare;
  faTrash:IconDefinition  = faTrash;
  faPlus:IconDefinition  = faPlus;
  isModalOpen = false;
  categoria:Categoria = {};
  categorias:Categoria[] = [
    /*{ nome: 'notebook', id: 10 },
    { nome: 'desktop', id: 9  },
    { nome: 'celular', id: 8 },
    { nome: 'tablet', id: 7 },
    { nome: 'periferico', id: 6 },
    { nome: 'camera', id: 5 },
    { nome: 'televisao', id: 4 },
    { nome: 'drone', id : 3},
    { nome: 'videogameConsole', id:2},
    { nome: 'videogameAcessorio', id : 1 },*/
  ];

  colunas:any[] = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'NOME', campo: 'nome' },
  ];

  buttons = [
    { icon: this.faPencil, iconClasses: 'text-3xl text-green  text-green-700', action: this.editar.bind(this) },
    { icon: this.faTrash, iconClasses: 'text-3xl text-red text-red-700', action: this.excluir.bind(this) }
  ];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
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
    this.router.navigate(["/categoria/"+item?.id]);
  }
  
  novaCategoria() {
    this.router.navigate(["/categoria/"]);
  }

  listar() {
    this.categorias = this.categoriaService.findAll()/*.subscribe({
      next: (response) => {
          this.isLoading = false;
          this.categorias = response;
      },
      error: (error) => {
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    })*/
  }


 /* onDeleteModalClose() {
    console.log("closed");
  }*/

  onDeleteModalConfirm(id?:number) {
    this.isModalOpen = false;
    this.categoriaService.delete(id)/*.subscribe({
      next: (response) => {
          this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });*/
  }

  
}
