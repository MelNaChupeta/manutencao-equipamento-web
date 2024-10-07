import { Component } from '@angular/core';

@Component({
  selector: 'app-estilo-tabela',
  standalone: true,
  imports: [],
  templateUrl: './estilo-tabela.component.html',
  styleUrl: './estilo-tabela.component.scss'
})
export class EstiloTabelaComponent {

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


}
