import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faDownload } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import { Categoria } from '../../../models';
import { TabelaComponent } from '../../common/estilo-tabela/estilo-tabela.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Receita } from '../../../models/receita';
import { CategoriaService, ReceitaService } from '../../../services';
import { ModalService } from '../../../services/modal.service';
import { ProgressService } from '../../../services/progress.service';
import { ErrorModalComponent } from '../../common/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-relatorio-receita',
  standalone: true,
  imports: [
    TabelaComponent,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [CurrencyPipe],
  templateUrl: './relatorio-receita.component.html',
  styleUrl: './relatorio-receita.component.scss'
})
export class RelatorioReceitaComponent implements OnInit {
  faLoading:IconDefinition = faCircleNotch;
  faDownload:IconDefinition  = faDownload;
  receitas:Receita[] = [];
  today: Date = new Date();
  todayStr = this.today.toISOString().split('T')[0];
  dataInicial!:string;
  dataFinal!:string;
  colunas:any[] = [
    { titulo: 'DATA', campo: 'periodo' , type: "date" },
    { titulo: 'VALOR', campo: 'valor' , type: "currency" },
  ];

  constructor(
    private currencyPipe: CurrencyPipe ,
    private categoriaService: CategoriaService,
    private receitaService: ReceitaService,
    private progressBarService: ProgressService,
    private modalService:ModalService
  ){

  }
  ngOnInit(): void {
    this.receitas = [];
    this.listaReceitas();
  }


  generateReceitasPDF() {
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(14);

    doc.text('Relatório de Receitas', 20, 20);
    doc.text(`Data: ${this.todayStr}`, 20, 30);

    let startY = 40;
    doc.setFontSize(12);
    doc.text('Data', 20, startY);
    doc.text('Valor', 60, startY);
    startY += 10;

    this.receitas.forEach((receita, index) => {
      doc.text(receita.periodo ?? "", 20, startY + (index * 10));
      doc.text(receita.valor ? receita.valor.toString() : "", 60, startY + (index * 10));
    });

    doc.save(`relatorio-receitas-${this.todayStr}.pdf`);
  }


  applyDateFilter() {
    this.listaReceitas();
  }

  listaReceitas() {
    this.progressBarService.show();
    this.receitaService.findByPeriodo(this.dataInicial , this.dataFinal).subscribe({
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

  parseDate(dateString:string) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
  
  formatCurrency(value: number) {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2');
  }

}
