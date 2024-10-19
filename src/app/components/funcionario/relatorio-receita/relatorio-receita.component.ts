import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faDownload } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import { Categoria } from '../../../models';
import { TabelaComponent } from '../../estilo-tabela/estilo-tabela.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio-receita',
  standalone: true,
  imports: [
    TabelaComponent,
    CommonModule,

  ],
  templateUrl: './relatorio-receita.component.html',
  styleUrl: './relatorio-receita.component.scss'
})
export class RelatorioReceitaComponent {
  faLoading:IconDefinition = faCircleNotch;
  faDownload:IconDefinition  = faDownload;

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

  colunas:any[] = [
    { titulo: 'ID', campo: 'id' },
    { titulo: 'NOME', campo: 'nome' },
  ];


  buttons = [
    { body: `<i class="fa-solid fa-download"></i>`, class: 'text-3xl text-red text-red-700',  action: (categoria: Categoria) => this.generatePDF(categoria)  }
  ];


  generatePDF(categoria: Categoria){

    const margins = {
      topTitle: 30,
      bottonTitle: 30,
      leftTitle: 65,
      rightTitle: 30,
      width: 522
    }

    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(14);

    doc.text('Relatório Categoria', margins.leftTitle, margins.topTitle);
    doc.text(`Categoria escolhida: `, 30, 50);
    doc.text(`NOME: ${categoria.nome}`, 30, 60);
    doc.text(`ID: ${categoria.id}`, 30, 70);
    doc.save(`relatorio-categoria-${categoria.nome}.pdf`);
  }

}
