import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faDownload } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import { Categoria } from '../../../models';
import { TabelaComponent } from '../../common/estilo-tabela/estilo-tabela.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relatorio-receita-categoria',
  standalone: true,
  imports: [
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

  constructor(private currencyPipe: CurrencyPipe) {

  }
  receitas: { categoria: string, data: string, valor: string | null }[] = [];
  receitasFiltered = this.receitas;
  ngOnInit(): void {
    this.receitas = [
      { categoria: 'desktop', data: '01/08/2024', valor: this.formatCurrency(1000.00) },
      { categoria: 'tablet', data: '05/08/2024', valor: this.formatCurrency(1500.00) },
      { categoria: 'celular', data: '10/08/2024', valor: this.formatCurrency(2000.00) },
      { categoria: 'periferico', data: '15/08/2024', valor: this.formatCurrency(2500.00) },
      { categoria: 'camera', data: '20/08/2024', valor: this.formatCurrency(3000.00) },
      { categoria: 'televisao', data: '25/08/2024', valor: this.formatCurrency(3500.00) },
      { categoria: 'drone', data: '30/08/2024', valor: this.formatCurrency(4000.00) },
      { categoria: 'videogameConsole', data: '04/09/2024', valor: this.formatCurrency(4500.00) },
      { categoria: 'videogameAcessorio', data: '09/09/2024', valor: this.formatCurrency(5000.00) },
      { categoria: 'tablet', data: '14/09/2024', valor: this.formatCurrency(5500.00) },
      { categoria: 'celular', data: '19/09/2024', valor: this.formatCurrency(6000.00) },
      { categoria: 'notebook', data: '24/09/2024', valor: this.formatCurrency(6500.00) },
      { categoria: 'desktop', data: '01/10/2024', valor: this.formatCurrency(7000.00) },
      { categoria: 'drone', data: '06/10/2024', valor: this.formatCurrency(7500.00) },
      { categoria: 'notebook', data: '11/10/2024', valor: this.formatCurrency(8000.00) },
      { categoria: 'periferico', data: '16/10/2024', valor: this.formatCurrency(8500.00) },
      { categoria: 'camera', data: '21/10/2024', valor: this.formatCurrency(9000.00) },
      { categoria: 'televisao', data: '26/10/2024', valor: this.formatCurrency(9500.00) },
      { categoria: 'videogameConsole', data: '30/10/2024', valor: this.formatCurrency(10000.00) }
    ];
    

    this.receitasFiltered = this.receitas;

  }


  categorias: Categoria[] = [
    { nome: 'notebook', id: 10 },
    { nome: 'desktop', id: 9 },
    { nome: 'celular', id: 8 },
    { nome: 'tablet', id: 7 },
    { nome: 'periferico', id: 6 },
    { nome: 'camera', id: 5 },
    { nome: 'televisao', id: 4 },
    { nome: 'drone', id: 3 },
    { nome: 'videogameConsole', id: 2 },
    { nome: 'videogameAcessorio', id: 1 },
  ];



  colunas: any[] = [
    { titulo: 'CATEGORIAS', campo: 'categoria', type: "" },
    { titulo: 'DATA', campo: 'data', type: "date" },
    { titulo: 'VALOR', campo: 'valor', type: "currency" },
  ];


  today: Date = new Date();
  todayStr = this.today.toISOString().split('T')[0];
  categoriaSelecionada = '';
  dataInicial = '';
  dataFinal = '';

  generateReceitasPDF() {
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(14);

    doc.text('Relatório de Receitas', 20, 20);
    doc.text(`Data: ${this.todayStr}`, 20, 30);

    let startY = 40;
    doc.setFontSize(12);
    doc.text('Categoria', 20, startY);
    doc.text('Data', 60, startY);
    doc.text('Valor', 100, startY);
    startY += 10;

    this.receitasFiltered.forEach((receita, index) => {
      doc.text(receita.categoria, 20, startY + (index * 10));
      doc.text(receita.data, 60, startY + (index * 10));
      doc.text(receita.valor || '', 100, startY + (index * 10));
    });

    doc.save(`relatorio-receitas-${this.todayStr}.pdf`);
  }

  applyCategoriaFilter() {
    if (this.categoriaSelecionada) {
      this.receitasFiltered = this.receitas.filter(receita =>
        receita.categoria.toLowerCase() === this.categoriaSelecionada.toLowerCase()
      );
    } else {
      this.receitasFiltered = this.receitas;
    }
  }  

  parseDate(dateString: string) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  formatCurrency(value: number) {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2');
  }

}
