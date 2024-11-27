import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../services';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { Categoria, Solicitacao } from '../../../models';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { AlertModalComponent } from '../../common/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-nova-solicitacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nova-solicitacao.component.html',
  styleUrl: './nova-solicitacao.component.scss',
})
export class NovaSolicitacaoComponent implements  OnInit{
  solicitacao = new Solicitacao();

  categorias:Categoria[] = [];

  solicitacaoEnviada = false;

  constructor(
    private categoriaService: CategoriaService,
    private solicitacaoService: SolicitacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private progressBarService: ProgressService,
    private modalService:ModalService){
      
  }
  ngOnInit(): void {
    this.listarCategoria();
  }

  onSubmit() {
    this.progressBarService.show();
    if (!this.solicitacao.descricaoEquipamento || !this.solicitacao.descricaoProblema )
      return;
    this.solicitacaoService.registrar(this.solicitacao).subscribe({
      next: (response) => {
        this.progressBarService.hide();
        this.modalService.open(AlertModalComponent, {
          title:"Sucesso",
          body:"Solicitacao cadastrada com sucesso",
          onClose: () => {
            this.router.navigate(['/inicio/clientes']);
          },
        }); 
      }, error: (response) => {
        this.progressBarService.hide();
        let message = 'Ocorreu um erro ao processar a requisi&ccedil;&atilde;o.';
        
        if(response.error?.message)
            message = response.error?.message;
        
        this.modalService.open(ErrorModalComponent, {
          title: "Erro ao registar solicitacao",
          body: `<p>${message}</p>`,
        });
      }
    });
  }

  listarCategoria() {
     this.progressBarService.show();
     this.categoriaService.findAll().subscribe({
      next: (response) => {
          this.progressBarService.hide();
          this.categorias = response;
      },
      error: (error) => {
        this.progressBarService.hide();
        this.modalService.open(ErrorModalComponent, {
          title:"Atenção",
          body:"Erro ao buscar categorias"
        });  
      }
    });
  }
}
