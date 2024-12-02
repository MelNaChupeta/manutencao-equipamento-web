import { Component, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faDownload } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import { Categoria } from '../../../models';
import { TabelaComponent } from '../../common/estilo-tabela/estilo-tabela.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService, ReceitaService } from '../../../services';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';
import { Receita } from '../../../models/receita';

@Component({
  selector: 'app-relatorio-receita-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TabelaComponent,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [CurrencyPipe],
  templateUrl: './relatorio-receita-categoria.component.html',
  styleUrl: './relatorio-receita-categoria.component.scss'
})
export class RelatorioReceitaCategoriaComponent {
  faLoading: IconDefinition = faCircleNotch;
  faDownload: IconDefinition = faDownload;
  categorias: Categoria[] = [];
  receitas: Receita[] = [];
  categoriaSelecionada:string = "";
  colunas: any[] = [
    { titulo: 'CATEGORIAS', campo: 'nomeCategoria', type: "" },
    { titulo: 'VALOR', campo: 'valor', type: "currency" },
  ];
  constructor(
    private currencyPipe: CurrencyPipe,
    private categoriaService: CategoriaService,
    private receitaService: ReceitaService,
    private progressBarService: ProgressService,
    private modalService:ModalService) {

  }
  ngOnInit(): void {
    this.receitas = [];
    this.listarCategorias();
    this.listaReceitas();

  }

  listarCategorias() {
    this.categoriaService.findAll().subscribe({
     next: (response) => {
         this.categorias = response;
     },
     error: (response) => {
       this.modalService.open(ErrorModalComponent, {
         title:"Atenção",
         body:"Erro ao buscar categorias"
       });  
     }
   });
 }

 listaReceitas(idCategoria?:string) {
    this.progressBarService.show();
    this.receitaService.findByCategoria(idCategoria).subscribe({
     next: (response) => {
         this.progressBarService.hide();
         this.receitas = response;
     },
     error: (response) => {
       this.progressBarService.hide();
       this.modalService.open(ErrorModalComponent, {
         title:"Atenção",
         body:"Erro ao buscar receitas"
       });  
     }
   });
 }

  generateReceitasPDF() {
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(14);

    doc.text('Relatório de Receitas', 20, 20);

    let startY = 40;
    doc.setFontSize(12);
    doc.text('Categoria', 20, startY);
    doc.text('Valor', 100, startY);
    startY += 10;

    this.receitas.forEach((receita, index) => {
      doc.text(receita.nomeCategoria ?? "", 20, startY + (index * 10));
      doc.text(receita.valor ? receita.valor.toFixed(2) : "0.0", 100, startY + (index * 10));
    });

    //doc.save(`relatorio-receitas-${this.todayStr}.pdf`);
    doc.save(`relatorio-receitas.pdf`);
  }

  applyCategoriaFilter() {
    this.listaReceitas(this.categoriaSelecionada);
  }  

  parseDate(dateString: string) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  formatCurrency(value: number) {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2');
  }

}
