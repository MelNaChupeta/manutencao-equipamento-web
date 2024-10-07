import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../../../models';
import { CategoriaService } from '../../../services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { faCircleNotch, faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-listar-catergoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule ,
    FontAwesomeModule
  ],
  templateUrl: './listar-catergoria.component.html',
  styleUrl: './listar-catergoria.component.scss'
})
export class ListarCatergoriaComponent {
  isLoading:boolean = false;
  loadingCategoria:boolean = false;
  faLoading:IconDefinition = faCircleNotch;
  faPencil:IconDefinition  = faPencilSquare;
  faTrash:IconDefinition  = faTrash;
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
    private categoriaService: CategoriaService,
    private router: Router){
    
  }

  excluir(id?:Number):void {
    let message = 'tem certeza que deseja excluir essa categoria ?';
    this.categoriaService.delete(id).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    });
  }

  editar(id?:Number){
    this.router.navigate(["/categoria/"+id]);
  }
  
  novaCategoria() {
    this.router.navigate(["/categoria/"]);
  }

  listar() {
    this.categoriaService.findAll().subscribe({
      next: (response) => {
          this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        let message = 'Ocorreu um erro ao processar a requisição.';
      }
    })
  }
}
