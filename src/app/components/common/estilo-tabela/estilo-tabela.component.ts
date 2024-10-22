import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faArrowDown , faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,FontAwesomeModule],
  templateUrl: './estilo-tabela.component.html',
  styleUrl: './estilo-tabela.component.scss'
})
export class TabelaComponent {
  faArrowUp:IconDefinition = faArrowUp
  faArrowDown:IconDefinition = faArrowDown
  
  @Input() dados: any[] = [];
  @Input() colunas: { titulo: string, campo: string }[] = [];
  @Input() buttons: { class: string, body:string, action: (item: any) => void }[] = [];
  
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  itensPorPagina:number = 5; 
  filter:string = ""; 
  paginatedData: any[] = [];
  currentPage = 1;
  totalPages = 1;

  dropdownFunction(element: HTMLElement): void { 
    const dropdowns: HTMLCollectionOf<Element> = document.getElementsByClassName("dropdown-content");
    let i: number;
    const list: HTMLElement = element.parentElement!.parentElement!.getElementsByClassName("dropdown-content")[0] as HTMLElement;
    list.classList.add("target");

    for (i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i] as HTMLElement;
        if (!dropdown.classList.contains("target")) {
            dropdown.classList.add("hidden");
        }
    }

    list.classList.toggle("hidden");
  }


  ngOnChanges(): void {
    this.currentPage = 1;
    this.paginarDados(this.dados);
  }

  paginarDados(dados:any[]) {
    if(this.filter) {
      dados = this.filterByName(dados);
    }
    const start = (this.currentPage - 1) * this.itensPorPagina;
    const end = start + this.itensPorPagina;
    this.totalPages = Math.ceil(dados.length / this.itensPorPagina);
    this.paginatedData = dados.slice(start, end);
  }

  sortByColumn(coluna:string) {
    if (this.sortedColumn === coluna) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = coluna;
      this.sortDirection = 'asc';
    }

    this.dados.sort((a, b) => {
      if (a[coluna] < b[coluna]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (a[coluna] > b[coluna]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.paginarDados(this.dados);
  }

  filterByName(paginatedData:any[]) {
    return paginatedData.filter(e => {
      let includes:boolean = false;
      this.colunas.map(c => {
        if(e[c.campo]?.toString().includes(this.filter)) {
          includes = true;
        }
      });
      return includes;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginarDados(this.dados);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginarDados(this.dados);
    }
  }

  onButtonClick(action: (item: any) => void, item: any) {
    action(item);
  }

}
